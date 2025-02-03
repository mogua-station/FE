"use client";

import CreateReviewCancelModal from "./CreateReviewCancelModal";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function BackButton() {
  const { user } = useUserStore();

  const handleOpenModal = () => {
    modal.open(
      ({ close }) => (
        <CreateReviewCancelModal userId={user!.userId} close={close} />
      ),
      {
        hasCloseBtn: false,
        isBottom: false,
        disableOverlayClick: true,
      },
    );
  };

  return (
    <button type='button' onClick={handleOpenModal}>
      <DeleteIcon className='size-6' />
    </button>
  );
}
