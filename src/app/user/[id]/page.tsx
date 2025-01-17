import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";

async function getUserInfo(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`, // 토큰 관리 전략 논의중
      },
    },
  );

  const { data } = await res.json();
  return data;
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const userInfo = await getUserInfo(userId);

  return (
    // 가시성을 위해 임시 배경 bg-black으로 설정함 (전체 레이아웃에 배경 넣기 전)
    <div className='flex h-full flex-1 flex-col bg-black p-4 tablet:px-20 tablet:py-[52px] desktop:py-[56px]'>
      <div className='mx-auto flex w-full flex-col desktop:max-w-[960px]'>
        {/* 유저 프로필 섹션 */}
        <section aria-label='프로필 정보'>
          <UserProfile userInfo={userInfo} />
        </section>
        {/* 유저 컨텐츠 섹션 */}
        <section aria-label='활동 내역'>
          <UserTabs
            isInstructor={userInfo.qualificationStatus === "QUALIFIED"}
            ownId={userInfo.ownId}
          />
        </section>
      </div>
    </div>
  );
}
