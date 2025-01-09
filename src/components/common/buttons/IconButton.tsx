import { type IconButtonProps } from "@/types/button";

export default function IconButton({
  size = "large",
  variant = "primary",
  mode = "default",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    large: "h-14 rounded-[14px]",
    small: "h-[38px] rounded-lg",
  }[size];

  const bgStyles = {
    default:
      variant === "primary"
        ? "bg-gray-900 border-gray-900"
        : "bg-gray-700 border-gray-700",
    special: "bg-gray-800 border-gray-800",
  }[mode];

  return (
    <button
      className={`btn-base px-4 text-orange-200 ${bgStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
