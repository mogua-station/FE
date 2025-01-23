import { overlay } from "overlay-kit";
import ModalBase from "@/components/common/modals/Modal";
import type { OverlayController, ModalInterface } from "@/types/overlay.type";

const modal = {
  /**
   * 모달을 열고 지정된 콘텐츠와 옵션으로 렌더링합니다.
   *
   * @function open
   * @param {Function} renderChildren - 모달 콘텐츠로 렌더링할 JSX.Element를 반환하는 함수입니다. 이 함수는 `OverlayController` 객체를 인수로 받습니다.
   * @param {Object} [options] - 모달 설정 옵션입니다.
   * @param {string} [options.title=""] - 모달 제목입니다.
   * @param {boolean} [options.hasCloseBtn=true] - 모달에 닫기 버튼을 표시할지 여부를 결정합니다.
   * @param {boolean} [options.isDark=false] - 모달의 배경을 어둡게 표시할지 여부를 결정합니다.
   * @param {boolean} [options.disableOverlayClick=false] - 모달 외부를 클릭하여 모달을 닫을 수 있는지 여부를 결정합니다.
   * @param {boolean} [options.isBottom=false] - 모달을 화면 하단에 표시할지 여부를 결정합니다.
   */
  open: (
    renderChildren: (props: OverlayController) => JSX.Element,
    options: {
      title?: string;
      hasCloseBtn?: boolean;
      isDark?: boolean;
      disableOverlayClick?: boolean;
      isBottom?: boolean;
    } = {},
  ) => {
    overlay.open(({ close, unmount, isOpen }) => {
      const props: ModalInterface & OverlayController = {
        title: options.title,
        hasCloseBtn: options.hasCloseBtn,
        isDark: options.isDark,
        disableOverlayClick: options.disableOverlayClick,
        isBottom: options.isBottom,
        close,
        unmount,
        isOpen,
        children: renderChildren({ close, unmount, isOpen }),
      };
      return <ModalBase {...props} />;
    });
  },

  /**
   * 모든 활성화된 모달을 닫습니다.
   *
   * @function close
   */
  closeAll: overlay.closeAll,

  /**
   * 모든 활성화된 모달을 완전히 제거합니다.
   *
   * @function unmount
   */
  unmountAll: overlay.unmountAll,
};

export default modal;
