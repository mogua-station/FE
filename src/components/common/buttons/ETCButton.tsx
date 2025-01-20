import { type ETCButtonProps } from "@/types/button";

export default function ETCButton({
  state = "default",
  children,
  className = "",
  ...props
}: ETCButtonProps) {
  const stateStyles = {
    default: "bg-gray-800 border-gray-800",
    activated: "bg-gray-400 border-gray-400",
  }[state];

  return (
    <button
      className={`btn-base h-11 gap-2.5 rounded-xl px-3.5 py-3 text-body-2-normal font-semibold text-gray-200 hover:bg-gray-400 ${stateStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
