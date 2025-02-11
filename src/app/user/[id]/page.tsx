export const dynamic = "force-dynamic";

import AuthWrapper from "@/components/auth/AuthWrapper";
import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";
import { getUserProfile } from "@/lib/user/getUserProfile";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  // Next.js는 서버 컴포넌트 내에서 동일한 요청에 대해 자동으로 중복 요청을 방지함
  const userInfo = await getUserProfile(params.id, {
    cache: "no-store",
  });

  return {
    title: `${userInfo?.nickname}님의 프로필 | mogua`,
    description: `${userInfo?.nickname}님의 활동 내역을 확인해보세요.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function UserPage({ params }: Props) {
  const userId = params.id;

  // 위의 generateMetadata와 동일한 요청이기 때문에 자동으로 재사용 됨
  const userInfo = await getUserProfile(userId, {
    cache: "no-store",
  });

  return (
    <AuthWrapper>
      <div className='flex h-full flex-1 flex-col p-4 tablet:px-20 tablet:py-[52px] desktop:py-[56px]'>
        <div className='relative z-10 mx-auto flex w-full flex-col desktop:max-w-[960px]'>
          {/* 유저 프로필 섹션 */}
          <section aria-label='프로필 정보'>
            <UserProfile userInfo={userInfo} />
          </section>
          {/* 유저 컨텐츠 섹션 */}
          <section aria-label='활동 내역'>
            <UserTabs
              userId={userId}
              isInstructor={userInfo.qualificationStatus === "QUALIFIED"}
            />
          </section>
        </div>
      </div>
    </AuthWrapper>
  );
}
