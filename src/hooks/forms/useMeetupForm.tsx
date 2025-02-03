import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocalStorageForm } from "./useLocalStorageForm";
import { useMeetupPermissions } from "./useMeetupPermissions";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import useCookie from "@/hooks/auths/useTokenState";
import { useIndexedDB } from "@/hooks/inputs/images/useIndexedDB";
import useMeetupMutations from "@/hooks/meetup/useMeetupMutations";
import { useGetProfile } from "@/hooks/user/useProfile";
import { fetchMeetupData } from "@/lib/meetDetail/meetDetailApi";
import { type MeetProps } from "@/types/meetDetail";
import { type MeetupFormType } from "@/types/meetup.type";
import getDefaultValues from "@/utils/meetupDefault";
import { checkForChanges, prepareFormData } from "@/utils/meetupHelpers";
import modal from "@/utils/modalController";

const useMeetupData = (id?: number) => {
  return useQuery<{ data: MeetProps }>({
    queryKey: ["meetup", id],
    queryFn: () => fetchMeetupData(id!),
    enabled: !!id,
  });
};

export const useMeetupForm = (id?: number) => {
  const isEdit = !!id;
  const { data } = useMeetupData(id);
  const meetupData = data?.data;
  const { userId } = useMeetupPermissions(meetupData);
  const { loadImage } = useIndexedDB();
  const [removedInitImage, setRemovedInitImage] = useState(false);
  const { createMeetupMutation, editMeetupMutation } = useMeetupMutations(id);
  const accessToken = useCookie("accessToken");
  const userInfo = useGetProfile(userId!, accessToken!);
  const tempKey = isEdit ? `meetup-edit-${id}` : "meetup-create";

  const methods = useForm<MeetupFormType>({
    defaultValues: getDefaultValues(meetupData),
    mode: "onChange",
  });

  useLocalStorageForm(methods, tempKey);

  const onSubmit: SubmitHandler<MeetupFormType> = async (data) => {
    if (editMeetupMutation.isPending || createMeetupMutation.isPending) return;

    const image = await loadImage();

    try {
      const formData = await prepareFormData(data, image, removedInitImage);

      if (isEdit) {
        if (!checkForChanges(data, meetupData) && !image && !removedInitImage) {
          modal.open(
            ({ close }) => (
              <FailModal
                close={close}
                title='모임 수정 실패'
                message='변경된 내용이 없습니다.'
              />
            ),
            { hasCloseBtn: false, isBottom: false },
          );
          return;
        }
        await editMeetupMutation.mutateAsync(formData);
      } else {
        await createMeetupMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Error processing meetup:", error);
    }
  };

  const isSubmitDisabled =
    methods.watch("title") === "" ||
    methods.watch("content") === "" ||
    methods.watch("recruitmentEndDate") === null ||
    methods.watch("meetingStartDate") === null ||
    methods.watch("meetingEndDate") === null ||
    (methods.watch("isOnline") === false &&
      methods.watch("location") === null) ||
    createMeetupMutation.isPending ||
    editMeetupMutation.isPending ||
    (isEdit && meetupData?.hostId !== userId);

  return {
    methods,
    onSubmit,
    isSubmitDisabled,
    isEdit,
    meetupData,
    userInfo,
    control: methods.control,
    watch: methods.watch,
    setValue: methods.setValue,
    setRemovedInitImage,
  };
};
