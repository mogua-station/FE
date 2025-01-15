"use client";

import { useState } from "react";
import CountIndicator from "../common/CountIndicator";
import ProfileImageInput from "./ProfileImageInput";
import TagInput from "./TagInput";
import SolidButton from "@/components/common/buttons/SolidButton";

type UserProfile = {
  userId: number;
  email: string;
  nickname: string;
  profileImg: string;
  qualificationStatus: "QUALIFIED" | "UNQUALIFIED";
  bio: string;
  userTagList: Array<{ id: number; tag: string }>;
  ownId: boolean;
};

interface EditProfileFormProps {
  userInfo: UserProfile;
}

export default function EditProfileForm({ userInfo }: EditProfileFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nickname: userInfo.nickname,
    bio: userInfo.bio,
    userTagList: userInfo.userTagList.map((tag) => tag.tag),
  });
  const { email, nickname, profileImg, bio, userTagList } = userInfo;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      userTagList: tags,
    }));
  };

  const getChangedFields = () => {
    const changes: {
      formData?: FormData;
      requestData?: Partial<typeof formData>;
    } = {};

    if (selectedImage) {
      changes.formData = new FormData();
      changes.formData.append("image", selectedImage);
    }

    const requestData: Partial<typeof formData> = {};
    const isChanged = {
      nickname: formData.nickname !== userInfo.nickname,
      bio: formData.bio !== userInfo.bio,
      tags:
        JSON.stringify(formData.userTagList) !==
        JSON.stringify(userInfo.userTagList.map((tag) => tag.tag)),
    };

    if (isChanged.nickname) requestData.nickname = formData.nickname;
    if (isChanged.bio) requestData.bio = formData.bio;
    if (isChanged.tags) requestData.userTagList = formData.userTagList;

    if (Object.keys(requestData).length > 0) {
      changes.requestData = requestData;
    }

    return changes;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changes = getChangedFields();

    if (!changes.formData && !changes.requestData) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const submitFormData = changes.formData || new FormData();
    if (changes.requestData) {
      submitFormData.append("request", JSON.stringify(changes.requestData));
    }

    console.log("전송할 데이터:", Object.fromEntries(submitFormData.entries()));

    // api 호출 예정
  };

  return (
    <form className='contents' onSubmit={handleSubmit}>
      <ProfileImageInput
        profileImg={profileImg}
        onImageSelect={setSelectedImage}
      />

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
          value={email}
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
          defaultValue={nickname}
          minLength={2}
          maxLength={8}
          onChange={handleChange}
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
            defaultValue={bio}
            maxLength={20}
            onChange={handleChange}
          />
          <div className='absolute bottom-4 right-4 -translate-y-1/2'>
            <CountIndicator currentCount={formData.bio.length} maxCount={20} />
          </div>
        </div>
        <p className='profile-edit-message'>최대 20자까지 입력 가능해요</p>

        {/* 태그 */}
        <TagInput defaultTags={userTagList} onTagsChange={handleTagsChange} />
      </div>

      {/* 수정 완료 버튼 */}
      <SolidButton className='my-14'>수정 완료</SolidButton>
    </form>
  );
}
