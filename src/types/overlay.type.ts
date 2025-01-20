export type OverlayController = {
  isOpen: boolean;
  close: () => void;
};

export type ModalInterface = {
  title?: string;
  hasCloseBtn?: boolean;
  children: React.ReactNode;
  isDark?: boolean;
};
