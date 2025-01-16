"use client";

import { useQuery } from "@tanstack/react-query";
import AccountActionButtons from "@/components/edit-profile/AccountActionButtons";
import ContactBanner from "@/components/edit-profile/ContactBanner";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";
import { userProfileApi } from "@/lib/userProfile";

// TODO: NavBar 없는 레이아웃 설정 필요
// TODO: 모바일, 태블릿 UI 구현 완료 (데스크탑 디자인 문의 중)
export default function EditProfile() {
  const userId = Number(process.env.NEXT_PUBLIC_USER_ID); // TODO: 임시 로그인유저 ID 사용(스토어로 관리 예정)

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => userProfileApi.getUserInfo(userId),
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "오류가 발생했습니다"}
      </div>
    );
  if (!userInfo) return <div>사용자 데이터가 없습니다</div>;

  return (
    <section className='flex h-full flex-1 flex-col items-center bg-gray-950'>
      <div className='flex w-full flex-col items-center bg-gray-900 p-4 tablet:px-10 tablet:pb-6 desktop:my-20 desktop:max-w-[960px] desktop:rounded-[40px]'>
        <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100 tablet:pt-10'>
          계정 정보
        </h2>
        <ContactBanner />
        <EditProfileForm userInfo={userInfo} />
        <AccountActionButtons />
      </div>
    </section>
  );
}
