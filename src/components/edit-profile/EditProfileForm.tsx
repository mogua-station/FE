"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import CommonTextArea from "../common/inputs/TextArea";
import CommonTextInput from "../common/inputs/TextInput";
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
  const { email, nickname, profileImg, bio, userTagList } = userInfo;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const methods = useForm({
    defaultValues: {
      nickname: nickname,
      bio: bio,
      userTagList: userTagList.map((tag) => tag.tag),
    },
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = methods;

  const handleTagsChange = (tags: string[]) => {
    methods.setValue("userTagList", tags); // React Hook Form으로 태그 업데이트
  };

  const getChangedFields = () => {
    const changes: {
      formData?: FormData;
      requestData?: any;
    } = {};

    const formValues = methods.getValues();
    const requestData: any = {};

    // 단순 비교로 변경
    if (formValues.nickname !== nickname) {
      requestData.nickname = formValues.nickname;
    }

    if (formValues.bio !== bio) {
      requestData.bio = formValues.bio;
    }

    const currentTags = formValues.userTagList;
    const originalTags = userTagList.map((tag) => tag.tag);
    if (
      JSON.stringify(currentTags.sort()) !== JSON.stringify(originalTags.sort())
    ) {
      requestData.userTagList = currentTags;
    }

    if (selectedImage) {
      changes.formData = new FormData();
      changes.formData.append("image", selectedImage);
    }

    if (Object.keys(requestData).length > 0) {
      changes.requestData = requestData;
    }

    return changes;
  };

  const onSubmit = methods.handleSubmit(() => {
    const changes = getChangedFields();

    if (!changes.formData && !changes.requestData) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const submitFormData = changes.formData || new FormData();
    if (changes.requestData) {
      submitFormData.append("request", JSON.stringify(changes.requestData));
    }

    // API 요청 전 최종 데이터 확인
    console.log("전송할 데이터:", Object.fromEntries(submitFormData.entries()));
  });

  return (
    <FormProvider {...methods}>
      <form className='contents' onSubmit={onSubmit}>
        <ProfileImageInput
          profileImg={profileImg}
          onImageSelect={setSelectedImage}
        />

        {/* 비밀번호 변경 안내 */}
        <p className='text-label-normal font-regular text-orange-200'>
          비밀번호 변경
        </p>

        {/* 유저 정보 (twMerge 적용으로 스타일 변경 예정)*/}
        {/* 이메일: 읽기전용 - 스타일 반영 필요 */}
        <div className='flex w-full flex-col gap-8 *:w-full'>
          <CommonTextInput
            className='cursor-not-allowed bg-gray-800 text-gray-500'
            name='email'
            label='이메일 주소'
            value={email}
            control={control}
            disabled
          />

          {/* 닉네임 */}
          <CommonTextInput
            className={twMerge(
              "bg-gray-800 text-gray-100",
              !errors.nickname &&
                "border-gray-700 hover:border-gray-700 focus:border-gray-700",
            )}
            name='nickname'
            label='닉네임'
            defaultValue={nickname}
            minLength={2}
            maxLength={8}
            control={control}
            rules={{
              minLength: {
                value: 2,
                message: "닉네임은 2글자 이상이어야 합니다.",
              },
              maxLength: {
                value: 8,
                message: "닉네임은 8글자를 넘어갈 수 없습니다.",
              },
            }}
            hint='최대 8글자까지 입력 가능해요'
          />

          {/* 한 줄 소개 */}
          <CommonTextArea
            className='h-40 max-h-40 resize-none bg-gray-800 text-gray-100'
            name='bio'
            label='소개'
            placeholder='소개를 입력해주세요'
            defaultValue={bio}
            maxLength={20}
            hint='최대 20자까지 입력 가능해요'
          />

          {/* 태그 */}
          <TagInput
            defaultTags={userTagList}
            onTagsChange={handleTagsChange}
            name='userTag'
          />
        </div>

        {/* 수정 완료 버튼 */}
        <SolidButton className='my-14'>수정 완료</SolidButton>
      </form>
    </FormProvider>
  );
}
