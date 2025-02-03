"use client";

import { useRef, useState } from "react";
import CameraIcon from "@/assets/images/icons/camera.svg";
import FilledDeleteIcon from "@/assets/images/icons/filled_delete.svg";
import { useSimpleImageUpload } from "@/hooks/useSimpleImageUpload";

export default function ReviewImageInput({
  onImageSelect,
}: {
  onImageSelect: (image: File | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    previewUrl,
    handleImageUpload: handleImagePreview,
    handleImageDelete,
  } = useSimpleImageUpload();

  const handleCameraclick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      handleImageDelete();
      onImageSelect(null);
    } else {
      inputRef.current?.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleImagePreview(e);
    onImageSelect(file);
  };

  return (
    <div>
      <label className='ml-2 text-body-2-normal font-medium text-gray-300'>
        모임 관련 사진이 있나요?
      </label>
      <div
        className='mt-3 flex h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 *:text-gray-500'
        onClick={handleCameraclick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {previewUrl ? (
          <div className='relative h-full w-full'>
            <img
              className='h-full w-full rounded-xl object-cover'
              src={previewUrl}
              alt='리뷰 이미지'
            />
            {isHovered && (
              <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-black/50'>
                <FilledDeleteIcon className='size-8 text-gray-800' />
              </div>
            )}
          </div>
        ) : (
          <>
            <CameraIcon className='size-8' />
            <p className='text-label-normal font-medium'>
              이미지를 추가해주세요
            </p>
          </>
        )}
        <input
          ref={inputRef}
          className='hidden'
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
