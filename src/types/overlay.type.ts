export type OverlayController = {
  overlayId: string;
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
};
