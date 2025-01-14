import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";

export default function UserPage() {
  return (
    // 데스크탑 뷰 디자인 확정x -> 모바일, 태블릿만 구현
    <div className='flex h-full flex-1 flex-col bg-black tablet:py-[52px] desktop:py-[56px]'>
      <div className='mx-auto flex w-full flex-col desktop:min-w-[1041px] desktop:max-w-[1200px]'>
        {/* 유저 프로필 */}
        <section aria-label='유저 프로필'>
          <UserProfile />
        </section>

        {/* 탭 목록 */}
        <UserTabs isInstructor />
      </div>
    </div>
  );
}
