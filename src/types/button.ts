import { type ButtonHTMLAttributes } from "react";

type ButtonSize = "large" | "small";
type ButtonState = "default" | "activated" | "inactive";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export interface SolidButtonProps extends BaseButtonProps {
  hierarchy?: "primary" | "secondary";
  size?: ButtonSize;
  state?: ButtonState;
}

export interface OutlineButtonProps extends BaseButtonProps {
  hierarchy?: "primary" | "secondary";
  size?: ButtonSize;
  state?: ButtonState;
}

export interface IconButtonProps extends BaseButtonProps {
  size?: ButtonSize;
}

export interface ETCButtonProps extends BaseButtonProps {
  state?: Exclude<ButtonState, "inactive">;
}
