import { type OutlineButtonProps } from "@/types/button";

export default function OutlineButton({
  hierarchy = "primary",
  size = "large",
  state = "default",
  children,
  className = "",
  ...props
}: OutlineButtonProps) {
  const hierarchyStyles = {
    primary: {
      large:
        "rounded-2xl px-4 gap-[10px] h-14 text-body-1-normal font-semibold",
      small:
        "rounded-[6px] px-4 gap-1 h-[38px] text-label-normal font-semibold",
    },
    secondary: {
      large: "h-14 gap-2 text-body-1-normal font-semibold px-4 rounded-[14px]",
      small:
        "h-[38px] gap-1 text-body-2-normal font-semibold px-[14px] rounded-lg",
    },
  }[hierarchy][size];

  const stateStyles =
    hierarchy === "primary"
      ? {
          default: "border-gray-700 text-gray-200",
          activated: "border-orange-300 border-[0.5px] text-gray-300",
          inactive:
            "border-gray-800 border-[0.5px] text-gray-500 cursor-not-allowed",
        }[state]
      : "border-orange-200 bg-gray-950 text-orange-300";

  return (
    <button
      className={`btn-base ${hierarchyStyles} ${stateStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
