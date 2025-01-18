"use client";

import { useRouter } from "next/navigation";
import DeleteIcon from "@/assets/images/icons/delete.svg";

export default function BackButton() {
  const router = useRouter();

  return (
    <button type='button' onClick={() => router.back()}>
      <DeleteIcon className='size-6' />
    </button>
  );
}
