import { overlay } from "overlay-kit";
import Modal from "@/components/common/modals/Modal";

export default function useModal() {
  const openModal = (children: React.ReactNode, title?: string) => {
    overlay.open((props) => (
      <Modal children={children} title={title} {...props} />
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
