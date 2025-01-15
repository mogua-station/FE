"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

  const { control } = methods;

  const handleTagsChange = (tags: string[]) => {
    methods.setValue("userTagList", tags); // React Hook Form으로 태그 업데이트
  };

  const getChangedFields = () => {
    const changes: {
      formData?: FormData;
      requestData?: any;
    } = {};

    const formValues = methods.getValues();

    // 디버깅용 로그
    console.log("수정된 값:", {
      현재닉네임: formValues.nickname,
      원래닉네임: nickname,
      현재bio: formValues.bio,
      원래bio: bio,
      현재태그: formValues.userTagList,
      원래태그: userTagList.map((tag) => tag.tag),
    });

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

  const onSubmit = methods.handleSubmit((data) => {
    console.log("폼 제출 시작");
    console.log("전체 폼 데이터:", data);
    console.log("bio 값:", methods.getValues("bio"));
    console.log("watch bio:", methods.watch("bio"));

    const changes = getChangedFields();
    console.log("변경된 필드:", changes);

    if (!changes.formData && !changes.requestData) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const submitFormData = changes.formData || new FormData();
    if (changes.requestData) {
      submitFormData.append("request", JSON.stringify(changes.requestData));
    }

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
        <div className='w-full *:w-full'>
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
            className='bg-gray-800 text-gray-100'
            name='nickname'
            label='닉네임'
            defaultValue={nickname}
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
            control={control}
            maxLength={20}
            hint='최대 20자까지 입력 가능해요'
          />

          {/* 태그 */}
          <TagInput defaultTags={userTagList} onTagsChange={handleTagsChange} />
        </div>

        {/* 수정 완료 버튼 */}
        <SolidButton className='my-14'>수정 완료</SolidButton>
      </form>
    </FormProvider>
  );
}
