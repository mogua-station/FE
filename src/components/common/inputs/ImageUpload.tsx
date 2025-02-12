import { useRef } from "react";
import UploadIcon from "@/assets/images/icons/camera.svg";
import { useUploadImage } from "@/hooks/inputs/images/useUploadImage";

type ImageUploadProps = {
  label: string;
};

const CommonImageInput = ({ label }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleImageUpload, handleImageDelete } = useUploadImage();

  const handleButtonClick = async () => {
    if (previewUrl) {
      // 이미지가 있는 경우 이미지 삭제
      await handleImageDelete();
    } else {
      // 이미지가 없는 경우 파일 선택 창 열기
      fileInputRef.current?.click();
    }
  };

  return (
    <div className='flex flex-col gap-[12px]'>
      <label
        htmlFor='fileInput'
        className='pl-[8px] text-body-2-normal font-medium text-gray-300'
      >
        {label}
      </label>

      {/* 이미지 업로드 버튼 */}
      <button
        type='button'
        className='group relative flex h-[120px] w-[120px] items-center justify-center rounded-[12px] border border-gray-800 bg-gray-900'
        onClick={handleButtonClick}
      >
        {/* 이미지 미리보기 */}
        {previewUrl ? (
          <div className='relative h-full w-full'>
            <img
              src={previewUrl}
              alt='Preview'
              className='h-[120px] w-[120px] rounded-[12px] object-cover group-hover:brightness-50'
            />
            {/* hover 시에만 보이도록 설정 */}
            <div className='absolute left-12 top-12 z-10 hidden h-[24px] w-[24px] items-center justify-center rounded-[7px] bg-[#28292E] p-1 text-center text-label-normal font-semibold text-[#C4C4C4] group-hover:block'>
              X
            </div>
          </div>
        ) : (
          <div>
            <UploadIcon className='size-10 text-gray-600' />
          </div>
        )}
      </button>
      <input
        type='file'
        id='fileInput'
        ref={fileInputRef}
        accept='image/*'
        onChange={handleImageUpload}
        className='hidden'
      />
    </div>
  );
};

export default CommonImageInput;
