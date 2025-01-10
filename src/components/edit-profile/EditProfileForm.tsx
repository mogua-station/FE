import CountIndicator from "./CountIndicator";
import ProfileImageInput from "./ProfileImageInput";
import TagInput from "./TagInput";
import SolidButton from "@/components/common/buttons/SolidButton";

export default function EditProfileForm() {
  return (
    <form className='contents' action=''>
      <ProfileImageInput />

      {/* 비밀번호 변경 안내 */}
      <p className='text-label-normal font-regular text-orange-200'>
        비밀번호 변경
      </p>

      {/* 유저 정보 (input은 공통 컴포넌트 적용 예상 중) */}
      <div className='w-full *:w-full'>
        {/* 이메일 (표시용) */}
        <label className='profile-edit-label' htmlFor='email'>
          이메일 주소
        </label>
        <input
          className='profile-edit-input'
          type='email'
          id='email'
          value={"user@email.com"}
          disabled
        />

        {/* 닉네임 */}
        <label className='profile-edit-label' htmlFor='username'>
          닉네임
        </label>
        <input
          className='profile-edit-input'
          type='text'
          id='username'
          name='nickname'
          minLength={2}
          maxLength={8}
        />
        <p className='profile-edit-message'>최대 8글자까지 입력 가능해요</p>

        {/* 한 줄 소개 */}
        <label className='profile-edit-label' htmlFor='introduction'>
          소개
        </label>
        <div className='relative'>
          <textarea
            className='h-40 w-full resize-none rounded-xl border border-gray-800 bg-gray-800 px-4 py-[18px] text-gray-100 placeholder:text-body-2-normal placeholder:font-regular'
            id='introduction'
            name='bio'
            placeholder='소개를 입력해주세요'
            maxLength={20}
          />
          <div className='absolute bottom-4 right-4 -translate-y-1/2'>
            <CountIndicator currentCount={0} maxCount={20} />
          </div>
        </div>
        <p className='profile-edit-message'>최대 20자까지 입력 가능해요</p>

        {/* 태그 */}
        <TagInput />
      </div>

      {/* 수정 완료 버튼 */}
      <SolidButton className='my-14'>수정 완료</SolidButton>
    </form>
  );
}
