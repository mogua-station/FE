import { type IconButtonProps } from "@/types/button";

export default function IconButton({
  size = "large",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    large: "h-14 rounded-[14px] bg-gray-900",
    small: "h-[38px] px-4 rounded-lg bg-gray-700",
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
