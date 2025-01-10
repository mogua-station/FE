import ArrowIcon from "@/assets/images/icons/arrow_down.svg";
import CameraIcon from "@/assets/images/icons/camera.svg";
import InfoIcon from "@/assets/images/icons/info.svg";
import SolidButton from "@/components/common/buttons/SolidButton";

// NavBar 없는 레이아웃 설정 필요
export default function EditProfile() {
  const labelStyles =
    "ml-2 text-body-2-normal inline-block mt-8 mb-3 font-medium text-gray-300";
  const messageStyles = "ml-2 mt-2 text-label-normal font-medium text-gray-500";
  const inputStyles =
    "px-4 py-[18px] rounded-xl border border-gray-800 bg-gray-800 disabled:text-gray-500 text-gray-100";

  return (
    <div className='flex h-full flex-1 flex-col items-center bg-gray-950 p-4'>
      <h2 className='w-full px-2 pb-4 text-body-1-reading font-medium text-gray-100'>
        계정 정보
      </h2>

      {/* 배너 - 모바일 시안만 있어 문의 중 */}
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
      <form className='contents' action=''>
        {/* 프로필 이미지 수정 */}
        <div className='relative mb-6 mt-8'>
          <img
            className='size-20 rounded-full border-4 border-gray-600 object-cover'
            src='https://cdn.pixabay.com/photo/2024/11/21/22/06/deer-9214838_640.jpg'
          />
          <input className='hidden' type='file' id='profile-image' />
          <label
            className='absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-600'
            htmlFor='profile-image'
          >
            <CameraIcon className='size-4 text-gray-100' />
          </label>
        </div>

        {/* 비밀번호 변경 */}
        <p className='text-label-normal font-regular text-orange-200'>
          비밀번호 변경
        </p>

        <div className='w-full *:w-full'>
          <label className={labelStyles} htmlFor='email'>
            이메일 주소
          </label>
          <input
            className={inputStyles}
            id='email'
            type='email'
            value={"user@email.com"}
            disabled
          />
          <label className={labelStyles} htmlFor='username'>
            닉네임
          </label>
          <input
            className={inputStyles}
            type='text'
            minLength={2}
            maxLength={8}
          />
          <p className={messageStyles}>최대 8글자까지 입력 가능해요</p>
          <label className={labelStyles} htmlFor='introduction'>
            소개
          </label>
          <div className='relative'>
            <textarea
              className='h-40 w-full resize-none rounded-xl border border-gray-800 bg-gray-800 px-4 py-[18px] text-gray-100 placeholder:text-body-2-normal placeholder:font-regular'
              id='introduction'
              placeholder='소개를 입력해주세요'
              maxLength={20}
            />
            <div className='absolute bottom-4 right-4 flex -translate-y-1/2 *:text-caption-normal *:font-regular'>
              <span className='text-gray-200'>0</span>
              <div className='before:mx-1.5 before:inline-block before:h-2.5 before:w-px before:bg-gray-700'>
                <span className='text-gray-500'>20</span>
              </div>
            </div>
          </div>
          <p className={messageStyles}>최대 20자까지 입력 가능해요</p>

          {/* 태그 */}
          <div className='mt-8'>
            <div className='flex justify-between'>
              <span className={`${labelStyles} mt-0`}>태그</span>
              <div className='flex *:text-caption-normal *:font-regular'>
                <span className='text-gray-200'>0</span>
                {/* 카운트 */}
                <div className='before:mx-1.5 before:inline-block before:h-2.5 before:w-px before:bg-gray-700'>
                  <span className='text-gray-500'>3</span>
                </div>
              </div>
            </div>
            <div className='my-3 inline-block rounded-xl bg-gray-800 px-3 py-2 text-caption-reading font-semibold text-gray-400'>
              # 태그추가
            </div>
          </div>
          <p className={`${messageStyles} mt-0`}>
            최대 5글자까지 입력 가능해요
          </p>
        </div>

        {/* 수정 완료 버튼 */}
        <SolidButton className='my-14'>수정 완료</SolidButton>
      </form>

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
