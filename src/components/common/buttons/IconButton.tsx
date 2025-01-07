import { type ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large" | "small";
  children: React.ReactNode;
  className?: string;
}

export default function IconButton({
  size = "large",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    large: "h-[56px] rounded-[14px] bg-gray-900",
    small: "h-[38px] px-[16px] rounded-[8px] bg-gray-700",
  }[size];

  return (
    <button
      className={`btn-base max-w-[72px] border-orange-200 text-orange-300 ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
