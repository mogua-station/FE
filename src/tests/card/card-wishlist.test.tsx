import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CardWishlist from "@/components/common/card/CardWishlist";
import useChangeWishlist from "@/hooks/useChangeWishlist";
import useUserStore from "@/store/auth/useUserStore";
import useUserWishlist from "@/store/wishlist/useUserWishlist";
import { type CardProps } from "@/types/card";
import "@testing-library/jest-dom";

//jest가 Zustand 상태를 mock하도록 설정
//default 설정으로 export default하는 저장소의 함수를 jest.fn()으로 대체
jest.mock("@/store/auth/useUserStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/store/wishlist/useUserWishlist", () => ({
  __esModule: true,
  default: jest.fn(),
}));

//찜하기 기능 hook mocking
jest.mock("@/hooks/useChangeWishlist", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loggedInWishlist: jest.fn(),
    nonLoggedInWishlist: jest.fn(),
  })),
}));

describe("카드 컴포넌트 북마크 조건부 렌더링 테스트", () => {
  const wishlistMock: Pick<
    CardProps,
    "meetupId" | "meetupStatus" | "isMypage"
  > = {
    meetupId: 1,
    meetupStatus: "RECRUITING",
    isMypage: false,
  };

  beforeEach(() => {
    //비회원 찜하기를 위한 로컬스토리지 설정
    const wishlist = JSON.stringify([1, 2, 3, 4, 5, 6]);

    //Object.defineProperty로 window 객체의 localStorage 속성을 직접 설정한다.
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key) => (key === "wishlist" ? wishlist : null)),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("로그인 상태에서 내가 찜한 모임일 때 북마크는 활성화 되야한다", async () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: {
        name: "박태현",
        email: "ithpark@codeit.com",
        userId: 68,
        profileImg:
          "https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/profileImage/defaultProfileImages/2.png",
      },
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    (
      useUserWishlist as jest.MockedFunction<typeof useUserWishlist>
    ).mockReturnValue({
      userAllWishlist: [1, 2, 3, 4, 5],
      setUserAllWishlist: jest.fn(),
    });

    render(<CardWishlist wishlistInfo={wishlistMock} />);

    await waitFor(() => {
      expect(screen.getByLabelText("active")).toBeInTheDocument();
    });
  });

  it("로그인 상태에서 찜한 모임이 아닐때는 북마크는 비활성화 되야한다", async () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: {
        name: "박태현",
        email: "ithpark@codeit.com",
        userId: 68,
        profileImg:
          "https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/profileImage/defaultProfileImages/2.png",
      },
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    (
      useUserWishlist as jest.MockedFunction<typeof useUserWishlist>
    ).mockReturnValue({
      userAllWishlist: [],
      setUserAllWishlist: jest.fn(),
    });

    render(<CardWishlist wishlistInfo={wishlistMock} />);

    await waitFor(() => {
      expect(screen.getByLabelText("default")).toBeInTheDocument();
    });
  });

  it("비로그인 상태에서 찜한 모임일 때 북마크는 활성화 되어야한다.", async () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: null,
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    const localWishlistMock: Pick<
      CardProps,
      "meetupId" | "meetupStatus" | "isMypage"
    > = {
      meetupId: 1,
      meetupStatus: "RECRUITING",
      isMypage: false,
    };

    render(<CardWishlist wishlistInfo={localWishlistMock} />);

    await waitFor(() => {
      expect(screen.getByLabelText("active")).toBeInTheDocument();
    });
  });

  it("비로그인 상태에서 찜한 모임이 아닐 때 북마크는 비활성화 되어야한다", async () => {
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: null,
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    const localWishlistMock: Pick<
      CardProps,
      "meetupId" | "meetupStatus" | "isMypage"
    > = {
      meetupId: 20,
      meetupStatus: "RECRUITING",
      isMypage: false,
    };

    render(<CardWishlist wishlistInfo={localWishlistMock} />);

    await waitFor(() => {
      expect(screen.getByLabelText("default")).toBeInTheDocument();
    });
  });
});

describe("찜하기 클릭 이벤트 테스트", () => {
  const wishlistMock: Pick<
    CardProps,
    "meetupId" | "meetupStatus" | "isMypage"
  > = {
    meetupId: 1,
    meetupStatus: "RECRUITING",
    isMypage: false,
  };

  beforeEach(() => {
    (
      useChangeWishlist as jest.MockedFunction<typeof useChangeWishlist>
    ).mockReturnValue({
      loggedInWishlist: jest.fn(),
      nonLoggedInWishlist: jest.fn(),
    });
  });

  it("비회원일 때 찜하기 클릭 시 nonLoggedInWishlist가 호출되어야한다", async () => {
    //비로그인 상태 설정
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: null,
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    render(<CardWishlist wishlistInfo={wishlistMock} />);

    const button = await waitFor(() => screen.getByRole("button"));
    fireEvent.click(button);

    //nonLoggedInWishlist가 호출되는지 확인
    expect(useChangeWishlist().nonLoggedInWishlist).toHaveBeenCalledWith(
      wishlistMock.meetupId,
      wishlistMock.meetupStatus,
      expect.any(Function),
    );
  });

  it("비회원일 때 찜하기 클릭 시 nonLoggedInWishlist가 호출되어야한다", async () => {
    //로그인 상태
    (useUserStore as jest.MockedFunction<typeof useUserStore>).mockReturnValue({
      user: {
        name: "박태현",
        email: "ithpark@codeit.com",
        userId: 68,
        profileImg:
          "https://fesi6.s3.dualstack.ap-southeast-2.amazonaws.com/profileImage/defaultProfileImages/2.png",
      },
      setUser: jest.fn(),
      clearUser: jest.fn(),
    });

    render(<CardWishlist wishlistInfo={wishlistMock} />);

    const button = await waitFor(() => screen.getByRole("button"));
    fireEvent.click(button);

    //loggedInWishlist 호출되는지 확인
    expect(useChangeWishlist().loggedInWishlist).toHaveBeenCalledWith(
      wishlistMock.meetupId,
      wishlistMock.meetupStatus,
    );
  });
});
