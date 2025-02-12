type Origin = "top" | "center" | "bottom";
type HorizontalOrigin = "left" | "center" | "right";

export type Position = {
  anchor: { vertical: Origin; horizontal: HorizontalOrigin };
  content: { vertical: Origin; horizontal: HorizontalOrigin };
};

export type PopoverRenderFn = (close: () => void) => React.ReactNode;

export type PopoverProps = {
  gapX?: number;
  gapY?: number;
  position?: Position;
  onOpen?: () => void;
  onClose?: () => void;

  /** Popover의 내용을 함수 형태로 받을 수 있음 */
  content: React.ReactNode | PopoverRenderFn;
  children: React.ReactNode;
};

type Align = "LR" | "CC" | "RL" | "LL" | "RR";

type DropdownItem = {
  label: string;
  value?: string;
  onClick?: (value: string) => void;
};

export type DropdownProps = {
  align?: Align;
  content: DropdownItem[];
  gapX?: number;
  gapY?: number;
  defaultSelected?: string;
  children: React.ReactNode;
  isReview?: boolean;
  isHeader?: boolean;
};
