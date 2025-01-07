import { type ETCButtonProps } from "@/types/button";

export default function ETCButton({
  state = "default",
  children,
  className = "",
  ...props
}: ETCButtonProps) {
  const stateStyles = {
    default: "bg-gray-800",
    activated: "bg-gray-400",
  }[state];

  return (
    <button
      className={`btn-base max-w- h-11 max-w-[132px] gap-[10px] rounded-xl text-body-2-normal font-semibold text-gray-200 hover:bg-gray-400 ${stateStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
