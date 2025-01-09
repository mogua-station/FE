import { type IconButtonProps } from "@/types/button";

export default function IconButton({
  size = "large",
  mode = "default",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    large: "h-14 rounded-[14px]",
    small: "h-[38px] rounded-lg",
  }[size];

  const bgStyles =
    size === "small" || mode === "special"
      ? "bg-gray-700 border-gray-700"
      : "bg-gray-900 border-gray-900";

  return (
    <button
      className={`btn-base px-4 text-orange-200 ${bgStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
