"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CameraIcon from "@/assets/images/icons/camera.svg";
import DeleteIcon from "@/assets/images/icons/delete.svg";
import { useUploadImage } from "@/hooks/inputs/images/useUploadImage";

export default function ProfileImageInput({
  profileImg,
  onImageSelect,
}: {
  profileImg: string;
  onImageSelect: (image: File | null) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { image, previewUrl, handleImageUpload, handleImageDelete } =
    useUploadImage();

  const handleCameraclick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (previewUrl) {
      handleImageDelete();
      onImageSelect(null);
    } else {
      inputRef.current?.click();
    }
  };

  const handleImageClick = () => {
    if (previewUrl) {
      handleImageDelete();
      onImageSelect(null);
    } else {
      inputRef.current?.click();
    }
  };

  useEffect(() => {
    if (image) {
      onImageSelect(image);
    }
  }, [image, onImageSelect]);

  return (
    <div
      className='relative mb-6 mt-8'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative cursor-pointer' onClick={handleImageClick}>
        <Image
          src={previewUrl || profileImg}
          alt='프로필 이미지'
          className='size-20 rounded-full border-4 border-gray-600 object-cover'
          width={80}
          height={80}
          priority
          quality={75}
          sizes='80px'
        />
        {previewUrl && isHovered && (
          <button
            className='absolute inset-0 flex items-center justify-center rounded-full bg-black/50'
            type='button'
          >
            <DeleteIcon className='size-6 text-white' />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        className='hidden'
        type='file'
        id='profile-image'
        name='profileImg'
        accept='image/*'
        onChange={handleImageUpload}
        data-testid='profile-image-input'
      />

      <label
        className='absolute bottom-0 right-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-600'
        htmlFor='profile-image'
        data-testid='camera-label'
        onClick={handleCameraclick}
      >
        <CameraIcon className='size-4 text-gray-100' />
      </label>
    </div>
  );
}
