import { type OutlinePrimaryButtonProps } from "@/types/button";

export default function OutlinePrimaryButton({
  size = "large",
  state = "default",
  children,
  className = "",
  ...props
}: OutlinePrimaryButtonProps) {
  const sizeStyles = {
    large: "rounded-2xl gap-[10px] h-14 text-body-1-normal font-semibold",
    small: "rounded-[6px] gap-1 h-[38px] text-label-normal font-semibold",
  }[size];

  const stateStyles = {
    default: "border-gray-700 text-gray-200",
    activated: "border-orange-300 border-[0.5px] text-gray-300",
    inactive: "border-gray-800 border-[0.5px] text-gray-500 cursor-not-allowed",
  }[state];

  return (
    <button
      className={`btn-base px-4 ${sizeStyles} ${stateStyles} ${className}`}
      disabled={state === "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}
