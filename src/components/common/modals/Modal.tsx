"use client";

import { useEffect, useState, useCallback } from "react";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import type { ModalInterface, OverlayController } from "@/types/overlay.type";

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

  const preventDefault = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 페이드아웃 시키고, 일정 시간이 지나면 unmount
      setIsVisible(false);
      const timer = setTimeout(unmount, 300);
      return () => clearTimeout(timer);
    }

    // 모달이 열릴 때 페이드인
    setIsVisible(true);

    // 스크롤 차단
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    // 뒤로가기 방지 (pushState 후 popstate가 발생하면 모달 닫기)
    history.pushState(null, "", location.href);
    const preventGoBack = () => {
      history.go(1);
      close();
    };
    window.addEventListener("popstate", preventGoBack);

    // 언마운트 또는 모달 닫힐 때 정리
    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [isOpen, close, unmount, preventDefault]);

  // 오버레이 클릭 시 닫기
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
