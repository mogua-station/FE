import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import { useIndexedDB } from "../inputs/images/useIndexedDB";
import useMeetupMutations from "../meetup/useMeetupMutations";
import { useGetProfile } from "../user/useProfile";
import { FailModal } from "@/components/create/modals/ResultInfoModal";
import { fetchMeetupData } from "@/lib/meetDetail/meetDetailApi";
import useUserStore from "@/store/auth/useUserStore";
import { type MeetProps } from "@/types/meetDetail";
import { type MeetupFormType } from "@/types/meetup.type";
import compareDates from "@/utils/compareDates";
import getDefaultValues from "@/utils/meetupDefault";
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
  const userId = useUserStore(useShallow((state) => state.user?.userId));
  const { loadImage } = useIndexedDB();
  const [removedInitImage, setRemovedInitImage] = useState(false);
  const { createMeetupMutation, editMeetupMutation } = useMeetupMutations(id);
  const userInfo = useGetProfile(userId!);
  const router = useRouter();

  useEffect(() => {
    if (meetupData?.hostId !== userId) {
      modal.open(
        ({ close }) => (
          <FailModal
            close={() => {
              close();
              router.replace("/");
            }}
            title='모임 수정 실패'
            message='본인이 개설한 모임만 수정할 수 있습니다.'
          />
        ),
        {
          hasCloseBtn: false,
          isBottom: false,
          disableOverlayClick: true,
        },
      );
    }
  }, [meetupData, userId, router]);

  const methods = useForm<MeetupFormType>({
    defaultValues: getDefaultValues(meetupData),
    mode: "onChange",
  });

  const handleFormData = async (data: MeetupFormType, image: File | null) => {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    formData.append("request", jsonBlob);

    if (image) {
      formData.append("image", image);
    } else if (removedInitImage) {
      formData.append("image", "");
    }

    return formData;
  };

  const checkForChanges = (data: MeetupFormType) => {
    return Object.entries(data).some(([key, value]) => {
      const compareKey = key === "isOnline" ? "online" : key;
      if (
        [
          "recruitmentStartDate",
          "recruitmentEndDate",
          "meetingStartDate",
          "meetingEndDate",
        ].includes(key) &&
        value instanceof Date &&
        meetupData?.[compareKey as keyof MeetProps]
      ) {
        const originalDate = new Date(
          meetupData[compareKey as keyof MeetProps] as string,
        );
        return !compareDates(value, originalDate);
      }
      return value !== meetupData?.[compareKey as keyof MeetProps];
    });
  };

  const onSubmit: SubmitHandler<MeetupFormType> = async (data) => {
    if (editMeetupMutation.isPending || createMeetupMutation.isPending) return;

    const image = await loadImage();

    try {
      if (isEdit) {
        const hasChanges = checkForChanges(data);
        if (!hasChanges && !image && !removedInitImage) {
          modal.open(
            ({ close }) => (
              <FailModal
                close={close}
                title='모임 수정 실패'
                message='변경된 내용이 없습니다.'
              />
            ),
            {
              hasCloseBtn: false,
              isBottom: false,
            },
          );
          return;
        }

        const formData = await handleFormData(data, image);
        await editMeetupMutation.mutateAsync(formData);
      } else {
        const formData = await handleFormData(data, image);
        await createMeetupMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Error creating meetup:", error);
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
    (isEdit === true && meetupData?.hostId !== userId);

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
