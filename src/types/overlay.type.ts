export type OverlayController = {
  isOpen: boolean;
  close: () => void;
};

export type ModalInterface = {
  title?: string;
  children: React.ReactNode;
  isDark?: boolean;
};
