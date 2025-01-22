export type OverlayController = {
  isOpen: boolean;
  unmount: () => void;
  close: () => void;
};

export type ModalInterface = {
  title?: string;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
  isDark?: boolean;
  disableOverlayClick?: boolean;
  isBottom?: boolean;
};
