import ArrowIcon from "@/assets/images/icons/arrow_down.svg";
import InfoIcon from "@/assets/images/icons/info.svg";
import EditProfileForm from "@/components/edit-profile/EditProfileForm";

// NavBar 없는 레이아웃 설정 필요
// 모바일, 태블릿 UI 구현 완료 (데스크탑 디자인 문의 중)
export default function EditProfile() {
  return (
    <div className='flex h-full flex-1 flex-col items-center bg-gray-950 p-4 tablet:px-10 tablet:pb-6'>
      <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100 tablet:pt-10'>
        계정 정보
      </h2>

      {/* 배너 */}
      <div className='flex w-full items-center justify-between rounded-2xl bg-gray-800 px-4 py-3 tablet:hidden'>
        <div className='flex gap-2.5'>
          <InfoIcon className='size-6 text-gray-400' />
          <p className='max-w-[160px] text-label-reading font-regular text-gray-300'>
            운영자 문의 후 과외 선생님으로 활동해보세요
          </p>
        </div>
        <ArrowIcon className='size-6 -rotate-90 text-gray-300' />
      </div>

      {/* 프로필 수정 폼 */}
      <EditProfileForm />

      {/* 로그아웃 | 탈퇴하기 */}
      <div className='flex *:text-label-normal *:font-regular *:text-gray-300'>
        <button>로그아웃</button>
        <div className='before:mx-3 before:inline-block before:h-2.5 before:w-px before:bg-gray-600'>
          <button>탈퇴하기</button>
        </div>
      </div>
    </div>
  );
}
