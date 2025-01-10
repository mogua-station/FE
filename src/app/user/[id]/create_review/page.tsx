import CameraIcon from "@/assets/images/icons/camera.svg";
import SolidButton from "@/components/common/buttons/SolidButton";

export default function CreateReview() {
  const labelStyle = "ml-2 text-body-2-normal font-medium text-gray-300";

  return (
    <div className='flex flex-1 flex-col bg-black px-4 py-3.5'>
      <h2 className='mt-5 text-heading-2 font-medium text-gray-200'>
        모과님 <br /> 이번 모임은 어땠나요?
      </h2>

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
