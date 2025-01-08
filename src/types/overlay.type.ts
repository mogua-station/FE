export type OverlayController = {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
};
