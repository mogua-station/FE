import UserProfile from "@/components/user-page/UserProfile";
import UserTabs from "@/components/user-page/UserTabs";
import { type UserProfile as UserProfileType } from "@/types/user-page";

const MOCK_PROFILE: UserProfileType = {
  userId: 1,
  email: "mock@mock.com",
  nickname: "모과씨",
  profileImg:
    "https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg",
  qualificationStatus: "QUALIFIED",
  bio: "안녕하세요, 모과입니다.",
  userTagList: ["개발자", "프론트엔드", "협업"],
  isOwnId: true,
};

export default function UserPage() {
  const userInfo = MOCK_PROFILE;

  return (
    // 가시성을 위해 임시 배경 bg-black으로 설정함 (전체 레이아웃에 배경 넣기 전)
    <div className='flex h-full flex-1 flex-col bg-black tablet:py-[52px] desktop:py-[56px]'>
      <div className='mx-auto flex w-full flex-col desktop:min-w-[1041px] desktop:max-w-[960px]'>
        {/* 유저 프로필 섹션 */}
        <section aria-label='프로필 정보'>
          <UserProfile userInfo={userInfo} />
        </section>
        {/* 유저 컨텐츠 섹션 */}
        <section aria-label='활동 내역'>
          <UserTabs
            isInstructor={userInfo.qualificationStatus === "QUALIFIED"}
          />
        </section>
      </div>
    </div>
  );
}
