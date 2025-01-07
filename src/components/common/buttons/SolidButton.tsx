import { type SolidButtonProps } from "@/types/button";

export default function SolidButton({
  hierarchy = "primary",
  size = "large",
  state = "default",
  children,
  className = "",
  ...props
}: SolidButtonProps) {
  const hierarchyStyles = {
    primary: {
      large:
        "h-14 text-body-1-normal px-[10px] gap-[10px] font-semibold rounded-2xl",
      small:
        "h-10 rounded-[6px] px-[10px] py-2 gap-1 text-label-normal font-medium",
    },
    secondary: {
      large:
        "h-[54px] text-body-2-normal px-4 gap-[10px] font-semibold rounded-2xl",
      small:
        "h-[38px] rounded-[6px] px-4 gap-1 text-body-2-normal font-semibold",
    },
  }[hierarchy][size];

  const stateStyles = {
    default: "bg-gray-800 border-gray-800 text-gray-200",
    activated: "bg-orange-300 border-orange-300 text-gray-50",
    inactive: "bg-gray-800 border-gray-800 text-gray-500 cursor-not-allowed",
  }[state];

  return (
    <button
      className={`btn-base ${hierarchyStyles} ${stateStyles} ${className}`}
      disabled={state === "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}
