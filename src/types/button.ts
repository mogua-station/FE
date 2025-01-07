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

export interface OutlinePrimaryButtonProps extends BaseButtonProps {
  size?: ButtonSize;
  state?: ButtonState;
}

export interface OutlineSecondaryButtonProps extends BaseButtonProps {
  size?: ButtonSize;
}

export interface IconButtonProps extends BaseButtonProps {
  size?: ButtonSize;
}

export interface ETCButtonProps extends BaseButtonProps {
  state?: Exclude<ButtonState, "inactive">;
}
