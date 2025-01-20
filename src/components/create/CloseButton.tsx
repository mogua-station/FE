"use client";

import { useRouter } from "next/navigation";
import DeleteIcon from "@/assets/images/icons/delete.svg";

export default function CloseButton() {
  const router = useRouter();

  const onClick = () => {
    router.replace("/");
  };

  return (
    <button
      onClick={onClick}
      className='flex size-6 items-center justify-center'
    >
      <DeleteIcon className='size-6 fill-gray-200' />
    </button>
  );
}
