import { type OutlineSecondaryButtonProps } from "@/types/button";

export default function OutlineSecondaryButton({
  size = "large",
  children,
  className = "",
  ...props
}: OutlineSecondaryButtonProps) {
  const sizeStyles = {
    large:
      "max-w-[137px] h-14 gap-2 text-body-1-normal font-semibold px-4 rounded-[14px]",
    small:
      "max-w-[120px] h-[38px] gap-1 text-body-2-normal font-semibold px-[14px] rounded-lg",
  }[size];

  return (
    <button
      className={`btn-base border-orange-200 bg-gray-950 text-orange-300 ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
