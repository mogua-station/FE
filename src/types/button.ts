import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "large" | "small";
type ButtonState = "default" | "activated" | "inactive";
type ButtonMode = "default" | "special";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface BaseVariantButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  mode?: ButtonMode;
}

export type SolidButtonProps = BaseVariantButtonProps;
export type OutlineButtonProps = BaseVariantButtonProps;

export interface IconButtonProps extends BaseButtonProps {
  size?: ButtonSize;
  mode?: ButtonMode;
}

export interface ETCButtonProps extends BaseButtonProps {
  state?: Exclude<ButtonState, "inactive">;
}
