import { type SolidButtonProps } from "@/types/button";

export default function SolidButton({
  hierarchy = "primary",
  size = "large",
  state = "default",
  children,
  className = "",
  ...props
}: SolidButtonProps) {
  const buttonHeight = {
    primary: {
      large: "h-[56px] text-body-1-normal font-semibold",
      small: "h-[40px] text-label-normal font-medium",
    },
    secondary: {
      large: "h-[54px] text-body-2-normal font-semibold",
      small: "h-[38px] text-body-2-normal font-semibold",
    },
  }[hierarchy][size];

  const stateStyles = {
    default: "bg-gray-800 border-gray-800 text-gray-200",
    activated: "bg-orange-300 border-orange-300 text-gray-50",
    inactive: "bg-gray-800 border-gray-800 text-gray-500 cursor-not-allowed",
  }[state];

  return (
    <button
      className={`btn-base btn-size-${size} ${buttonHeight} ${stateStyles} ${className}`}
      disabled={state === "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}
