import { type ButtonHTMLAttributes } from "react";

interface OutlinePrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "small";
  state?: "default" | "activated" | "inactive";
  children: React.ReactNode;
  className?: string;
}

export default function OutlinePrimaryButton({
  size = "large",
  state = "default",
  children,
  className = "",
  ...props
}: OutlinePrimaryButtonProps) {
  const sizeStyles = {
    large: "btn-size-large h-[56px] text-body-1-normal font-semibold",
    small: "btn-size-small h-[40px] text-label-normal font-semibold",
  }[size];

  const stateStyles = {
    default: "border-gray-700 text-gray-200",
    activated: "border-orange-300 border-[0.5px] text-gray-300",
    inactive: "border-gray-800 border-[0.5px] text-gray-500 cursor-not-allowed",
  }[state];

  return (
    <button
      className={`btn-base ${sizeStyles} ${stateStyles} ${className}`}
      disabled={state === "inactive"}
      {...props}
    >
      {children}
    </button>
  );
}
