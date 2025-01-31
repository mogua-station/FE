import { render } from "@testing-library/react";
import { overlay } from "overlay-kit";
import ModalBase from "@/components/common/modals/Modal";
import modal from "@/utils/modalController";

// overlay 모듈 모킹
jest.mock("overlay-kit", () => ({
  overlay: {
    open: jest.fn(),
    closeAll: jest.fn(),
    unmountAll: jest.fn(),
  },
}));

// ModalBase 컴포넌트 모킹
jest.mock("@/components/common/modals/Modal", () =>
  jest.fn(() => <div>ModalBase Mock</div>),
);

describe("Modal Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모달 열기", () => {
    const renderChildren = jest.fn(() => <div>Test Content</div>);
    const options = {
      title: "Test Title",
      hasCloseBtn: false,
      isDark: true,
      disableOverlayClick: true,
      isBottom: true,
    };

    modal.open(renderChildren, options);

    expect(overlay.open).toHaveBeenCalledWith(expect.any(Function));

    // overlay.open에 전달된 함수를 호출하여 ModalBase가 올바른 props로 렌더링되는지 확인
    const overlayOpenCallback = (overlay.open as jest.Mock).mock.calls[0][0];
    const { close, unmount, isOpen } = {
      close: jest.fn(),
      unmount: jest.fn(),
      isOpen: true,
    };
    const modalProps = {
      title: options.title,
      hasCloseBtn: options.hasCloseBtn,
      isDark: options.isDark,
      disableOverlayClick: options.disableOverlayClick,
      isBottom: options.isBottom,
      close,
      unmount,
      isOpen,
      children: renderChildren(),
    };

    const { container } = render(
      overlayOpenCallback({ close, unmount, isOpen }),
    );
    expect(container).toMatchSnapshot();
    expect(ModalBase).toHaveBeenCalledWith(modalProps, {});
  });

  it("모든 모달 닫기", () => {
    modal.closeAll();
    expect(overlay.closeAll).toHaveBeenCalled();
  });

  it("모든 모달 제거하기", () => {
    modal.unmountAll();
    expect(overlay.unmountAll).toHaveBeenCalled();
  });
});
