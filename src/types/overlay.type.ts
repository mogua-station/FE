export type OverlayController = {
  isOpen: boolean;
  close: () => void;
};

export type ModalInterface = {
  title?: string;
  children: React.ReactNode;
  isDark?: boolean;
};

export type StateType = "ALL" | "RECRUITING" | "IN_PROGRESS" | "COMPLETED";

export type CityType =
  | "ALL"
  | "Capital"
  | "DAEJEON"
  | "JEONJU"
  | "GWANGJU"
  | "BUSAN"
  | "DAEGU"
  | "GANGNEUNG";
