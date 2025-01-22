"use client";

import { useEffect, useState, useCallback } from "react";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import {
  type ModalInterface,
  type OverlayController,
} from "@/types/overlay.type";

export default function ModalBase({
  title,
  children,
  hasCloseBtn = true,
  isDark = false,
  disableOverlayClick = false,
  isBottom = true,
  close,
  isOpen,
  unmount,
}: OverlayController & ModalInterface) {
  const [isVisible, setIsVisible] = useState(false);
  const preventDefault = useCallback((e: Event) => e.preventDefault(), []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        unmount();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, unmount]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [isOpen, preventDefault]);

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
    if (!disableOverlayClick) close();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } bg-gray-950-48`}
      onPointerUp={handleOverlayClick}
    >
      <div
        onPointerUp={(e) => e.stopPropagation()}
        className={`absolute ${
          isBottom
            ? "bottom-0 w-full rounded-t-3xl"
            : "bottom-1/2 w-fit rounded-3xl"
        } left-1/2 flex max-h-dvh min-w-[17.6875rem] -translate-x-1/2 transform flex-col items-center text-gray-100 transition-all tablet:bottom-1/2 tablet:mb-0 tablet:w-fit tablet:translate-y-1/2 tablet:rounded-3xl ${
          isDark ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        <div className='flex w-full flex-col items-center'>
          <div className='flex max-h-full min-h-[1.3125rem] w-full items-center justify-center'>
            {isBottom && (
              <div
                className={`h-[0.3125rem] w-16 rounded-full bg-black tablet:hidden ${isBottom ? "" : "hidden"}`}
              />
            )}
          </div>
          {(title || hasCloseBtn) && (
            <div
              className={`flex max-h-14 min-h-8 w-full items-center px-5 py-1 ${
                title ? "justify-between" : "justify-end"
              }`}
            >
              {title && (
                <span className='flex h-14 items-center text-body-1-normal font-semibold text-gray-200'>
                  {title}
                </span>
              )}
              {hasCloseBtn && (
                <button onClick={close} className='size-6'>
                  <DeleteIcon className='fill-gray-200' />
                </button>
              )}
            </div>
          )}
          <div className='w-full grow pb-4'>{children}</div>
        </div>
      </div>
    </div>
  );
}
