"use client";

import SolidButton from "@/components/common/buttons/SolidButton";
import { type ButtonVariant } from "@/types/button";

type ButtonState = "activated" | "default";

const BUTTON_STYLES = {
  activated: {
    className: "h-full w-[114px] text-nowrap border-none",
    variant: "secondary" as ButtonVariant,
    state: "activated" as ButtonState,
  },
  default: {
    className: "h-full w-[114px] text-nowrap bg-gray-600",
    variant: "secondary" as ButtonVariant,
    state: "default" as ButtonState,
  },
} as const;

interface ButtonConfig {
  text: string;
  onClick: () => void;
  isActivated: boolean;
}

interface UserCancelModalProps {
  title: string;
  message?: string;
  leftButton: ButtonConfig;
  rightButton: ButtonConfig;
}

export default function ConfirmModal({
  title,
  message,
  leftButton,
  rightButton,
}: UserCancelModalProps) {
  const getButtonStyle = (isActivated: boolean) =>
    isActivated ? BUTTON_STYLES.activated : BUTTON_STYLES.default;

  const leftButtonStyle = getButtonStyle(leftButton.isActivated);
  const rightButtonStyle = getButtonStyle(rightButton.isActivated);

  return (
    <div className='mx-auto w-[238px] rounded-3xl bg-gray-800 pb-2 pt-[11px]'>
      <div className='text-center'>
        <p className='text-heading-2 font-medium text-gray-100'>{title}</p>
        {message && (
          <p className='mt-3 text-body-2-normal font-medium text-gray-400'>
            {message}
          </p>
        )}
      </div>
      <div className='mt-6 flex h-[52px] justify-center gap-[7px] text-body-2-normal font-semibold'>
        <SolidButton
          className={leftButtonStyle.className}
          variant={leftButtonStyle.variant}
          state={leftButtonStyle.state}
          onClick={leftButton.onClick}
        >
          {leftButton.text}
        </SolidButton>
        <SolidButton
          className={rightButtonStyle.className}
          variant={rightButtonStyle.variant}
          state={rightButtonStyle.state}
          onClick={rightButton.onClick}
        >
          {rightButton.text}
        </SolidButton>
      </div>
    </div>
  );
}
