import { type IconButtonProps } from "@/types/button";

export default function IconButton({
  size = "large",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    large: "h-14 rounded-[14px] bg-gray-900 border-gray-900",
    small: "h-[38px] rounded-lg bg-gray-700 border-gray-700",
  }[size];

  return (
    <button
      className={`btn-base px-4 text-orange-200 ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
