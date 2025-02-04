export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";
import { getUserProfile } from "@/lib/user/getUserProfile";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value || "";

  if (!token) {
    throw new Error("인증이 필요한 페이지입니다.");
  }

  const userInfo = await getUserProfile(userId, {
    cache: "no-store",
  });

  if (!userInfo) {
    notFound();
  }

  return (
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
            token={token}
          />
        </section>
      </div>
    </div>
  );
}
