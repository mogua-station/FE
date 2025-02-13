"use client";

import CancelModal from "./CancelModal";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import useUserStore from "@/store/auth/useUserStore";
import modal from "@/utils/modalController";

export default function BackButton() {
  const { user } = useUserStore();

  const handleOpenModal = () => {
    modal.open(
      ({ close }) => <CancelModal userId={user!.userId} close={close} />,
      {
        hasCloseBtn: false,
        isBottom: false,
        disableOverlayClick: true,
      },
    );
  };

  return (
    <button
      className='p-1'
      type='button'
      aria-label='뒤로가기'
      onClick={handleOpenModal}
    >
      <DeleteIcon className='size-6' />
    </button>
  );
}
