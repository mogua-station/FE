import { overlay } from "overlay-kit";
import Modal from "@/components/common/modals/Modal";
import { type ModalInterface } from "@/types/overlay.type";

export default function useModal() {
  const openModal = ({
    title,
    hasCloseBtn,
    children,
    isDark,
  }: ModalInterface) => {
    overlay.open((props) => (
      <Modal
        title={title}
        hasCloseBtn={hasCloseBtn}
        children={children}
        isDark={isDark}
        close={props.close}
        isOpen={props.isOpen}
      />
    ));
  };

  const closeModal = () => {
    overlay.closeAll();
  };

  const unmountModal = () => {
    overlay.unmountAll();
  };

  return { openModal, closeModal, unmountModal };
}
