import { type ButtonHTMLAttributes } from "react";

interface OutlineSecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "small";
  children: React.ReactNode;
  className?: string;
}

export default function OutlineSecondaryButton({
  size = "large",
  children,
  className = "",
  ...props
}: OutlineSecondaryButtonProps) {
  const sizeStyles = {
    large:
      "max-w-[137px] h-[56px] gap-[8px] text-body-1-normal font-semibold px-[16px] rounded-[14px]",
    small:
      "max-w-[120px] h-[38px] gap-[4px] text-body-2-normal font-semibold px-[14px] rounded-[8px]",
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
