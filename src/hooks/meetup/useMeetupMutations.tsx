import { useMutation } from "@tanstack/react-query";
import { useIndexedDB } from "../inputs/images/useIndexedDB";
import {
  FailModal,
  SuccessModal,
} from "@/components/create/modals/ResultInfoModal";
import { revalidateMeetupTag } from "@/lib/actions/meetupRevalidate";
import { createMeetup, editMeetup } from "@/lib/main/meetup.api";
import modal from "@/utils/modalController";

const useMeetupMutations = (id?: number) => {
  const { deleteImage } = useIndexedDB();

  const commonOnSuccess = async (meetupId: number, isEdit = false) => {
    if (isEdit) {
      localStorage.removeItem(`meetup-edit-${meetupId}`);
    } else {
      localStorage.removeItem("meetup-create");
    }

    modal.open(
      ({ close }) => (
        <SuccessModal meetupId={meetupId} close={close} isEdit={isEdit} />
      ),
      {
        hasCloseBtn: false,
        isBottom: false,
        disableOverlayClick: true,
      },
    );

    await deleteImage();
    await revalidateMeetupTag();
  };

  const commonOnError = (title: string, message: string) => {
    modal.open(
      ({ close }) => (
        <FailModal title={title} message={message} close={close} />
      ),
      {
        hasCloseBtn: false,
        isBottom: false,
      },
    );
  };

  const createMeetupMutation = useMutation({
    mutationFn: createMeetup,
    onSuccess: async (data: { data: { meetupId: number } }) => {
      await commonOnSuccess(data.data.meetupId);
    },
    onError: () => {
      commonOnError("모임 개설 실패", "모임 개설 중 오류가 발생했어요");
    },
  });

  const editMeetupMutation = useMutation({
    mutationFn: (formData: FormData) => editMeetup({ id: id!, formData }),
    onSuccess: async () => {
      await commonOnSuccess(id!, true);
    },
    onError: () => {
      commonOnError("모임 수정 실패", "모임 수정 중 오류가 발생했어요");
    },
  });

  return { createMeetupMutation, editMeetupMutation };
};

export default useMeetupMutations;
