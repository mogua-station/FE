import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";

export const USER_ID = 32; // TODO: 임시 로그인유저 ID (스토어로 관리 예정)

// TODO: 유저 페이지에서 사용하는 로직과 같아 공통으로 분리 예정
async function getUserInfo(userId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.USER_TOKEN_2}`, // TODO: 토큰 관리 전략 논의중
      },
    },
  );
  const { data } = await res.json();
  return data;
}

// TODO: NavBar 없는 레이아웃 설정 필요
// TODO: 모바일, 태블릿 UI 구현 완료 (데스크탑 디자인 문의 중)
export default async function EditProfile() {
  const userInfo = await getUserInfo(USER_ID);

  return (
    <div className='flex h-full flex-1 flex-col items-center bg-gray-950'>
      <div className='flex w-full flex-col items-center bg-gray-900 p-4 tablet:px-10 tablet:pb-6 desktop:my-20 desktop:max-w-[960px] desktop:rounded-[40px]'>
        <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100 tablet:pt-10'>
          계정 정보
        </h2>
        <ContactBanner />
        <EditProfileForm userInfo={userInfo} />
        <AccountActionButtons />
      </div>
    </div>
  );
}
