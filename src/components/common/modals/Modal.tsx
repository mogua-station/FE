"use client";

import { useEffect } from "react";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import {
  type ModalInterface,
  type OverlayController,
} from "@/types/overlay.type";

export default function Modal({
  title,
  children,
  isDark = true,
  ...props
}: OverlayController & ModalInterface) {
  const { close, isOpen, ...rest } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const preventGoBack = () => {
      history.go(1);
      close();
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => window.removeEventListener("popstate", preventGoBack);
  }, [isOpen, close]);

  const handleOverlayClick = () => {
    close();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex transform items-center justify-center bg-gray-950-48 transition-all'
      onPointerUp={handleOverlayClick}
    >
      <div
        onPointerUp={(e) => e.stopPropagation()}
        className={`absolute bottom-0 left-1/2 flex max-h-dvh w-full -translate-x-1/2 transform flex-col items-center rounded-t-3xl text-gray-100 transition-all tablet:bottom-1/2 tablet:mb-0 tablet:w-fit tablet:translate-y-1/2 tablet:rounded-3xl ${isDark ? "bg-gray-900" : "bg-gray-800"}`}
        {...rest}
      >
        <div className='flex w-full flex-col items-center'>
          <div className='flex max-h-full min-h-[1.3125rem] w-full items-center justify-center'>
            <div className='h-[0.3125rem] w-16 rounded-full bg-black tablet:hidden' />
          </div>

          <div
            className={`flex max-h-14 min-h-8 w-full max-w-[23rem] items-center px-5 py-1 ${title ? "justify-between" : "justify-end"}`}
          >
            {title && (
              <span className='flex h-14 items-center text-body-1-normal font-semibold text-gray-200'>
                {title}
              </span>
            )}

            <button onClick={close} className='size-6'>
              <DeleteIcon className='fill-gray-200' />
            </button>
          </div>

          <div className='w-full grow pb-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
