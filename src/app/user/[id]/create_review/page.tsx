import CameraIcon from "@/assets/images/icons/camera.svg";
import CharacterIcon1 from "@/assets/images/icons/character_1.svg";
import CharacterIcon2 from "@/assets/images/icons/character_2.svg";
import CharacterIcon3 from "@/assets/images/icons/character_3.svg";
import SolidButton from "@/components/common/buttons/SolidButton";
import CountIndicator from "@/components/common/CountIndicator";

export default function CreateReview() {
  const labelStyle = "ml-2 text-body-2-normal font-medium text-gray-300";
  const requiredStyle = "absolute ml-0.5 pt-0.5 text-danger";

  const ratingOptions = [
    { value: 0, label: "그냥그래요", character: <CharacterIcon1 /> },
    { value: 1, label: "괜찮아요", character: <CharacterIcon2 /> },
    { value: 2, label: "추천해요", character: <CharacterIcon3 /> },
  ];

  return (
    <div className='flex flex-1 flex-col bg-black px-4 py-3.5'>
      <h2 className='mt-5 text-heading-2 font-medium text-gray-200'>
        모과님 <br /> 이번 모임은 어땠나요?
      </h2>
      {/* 모임 정보 */}

      {/* 모임 평가 */}
      <fieldset>
        <legend className={labelStyle}>
          모임은 어땠나요?
          <span className={requiredStyle} aria-label='필수 항목'>
            *
          </span>
        </legend>
        <div className='mb-12 mt-6 flex justify-center gap-7 text-label-normal font-medium text-gray-500'>
          {ratingOptions.map((option) => (
            <div key={option.value}>
              <label
                className='flex cursor-pointer flex-col items-center gap-3.5'
                htmlFor={`rating-${option.value}`}
              >
                <div className='size-20 overflow-hidden rounded-3xl border border-gray-600 bg-gray-900 opacity-80'>
                  {option.character}
                </div>
                {option.label}
              </label>
              <input
                className='hidden'
                type='radio'
                name='rating'
                value={option.value}
                id={`rating-${option.value}`}
                required
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* 리뷰 내용 */}
      <label className={labelStyle} htmlFor='content'>
        구체적인 경험을 알려주세요
        <span className={requiredStyle} aria-label='필수 항목'>
          *
        </span>
      </label>
      <div className='relative'>
        <textarea
          className='mb-12 mt-6 h-40 w-full resize-none rounded-xl border border-gray-800 bg-gray-800 px-4 py-[18px] text-gray-100 placeholder:text-body-2-normal placeholder:font-regular'
          id='content'
          name='content'
          placeholder='모임의 장소, 환경, 진행, 구성 등 만족스러웠나요?'
          maxLength={150}
        />
        <div className='absolute bottom-[64px] right-5 -translate-y-1/2'>
          <CountIndicator currentCount={0} maxCount={150} />
        </div>
      </div>

      {/* 리뷰 사진 */}
      <p className={labelStyle}>모임 관련 사진이 있나요?</p>
      <label
        className='mb-14 mt-3 flex h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-[18px] *:text-gray-500'
        htmlFor='thumbnail'
      >
        <CameraIcon className='size-8' />
        <p className='text-label-normal font-medium'>이미지를 추가해주세요</p>
      </label>
      <input type='file' id='thumbnail' className='hidden' />
      <SolidButton>작성 완료</SolidButton>
    </div>
  );
}
