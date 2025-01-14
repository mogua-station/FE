import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";

export default function UserPage() {
  return (
    // 가시성을 위해 임시 배경 bg-black으로 설정함 (전체 레이아웃에 배경 넣기 전)
    <div className='flex h-full flex-1 flex-col bg-black tablet:py-[52px] desktop:py-[56px]'>
      <div className='mx-auto flex w-full flex-col desktop:min-w-[1041px] desktop:max-w-[960px]'>
        {/* 유저 프로필 섹션 */}
        <section aria-label='프로필 정보'>
          <UserProfile />
        </section>
        {/* 유저 컨텐츠 섹션 */}
        <section aria-label='활동 내역'>
          <UserTabs isInstructor />
        </section>
      </div>
    </div>
  );
}
