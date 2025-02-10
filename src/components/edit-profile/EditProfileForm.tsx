"use client";

import { useCallback, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DotLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";
import { CommonNicknameInput } from "../auth/AuthInputs";
import CommonTextArea from "../common/inputs/TextArea";
import CommonTextInput from "../common/inputs/TextInput";
import ProfileImageInput from "./ProfileImageInput";
import TagInputField from "./TagInputField";
import SolidButton from "@/components/common/buttons/SolidButton";
import { SYSTEM_ALERTS } from "@/constants/alerts";
import { useEditProfile } from "@/hooks/user/useEditProfile";

type FormValues = {
  nickname: string;
  bio: string;
  userTagList: string[];
};

export default function EditProfileForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { userInfo, error, handleProfileUpdate, isUpdating, isLoading } =
    useEditProfile();

  const methods = useForm<FormValues>({
    mode: "onChange",
    values: userInfo
      ? {
          nickname: userInfo.nickname || "",
          bio: userInfo.bio || "",
          userTagList: userInfo.userTagList?.map((tag) => tag.tag) || [],
        }
      : undefined,
  });

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  const watchedNickname = watch("nickname");
  const watchedBio = watch("bio");
  const watchedTags = watch("userTagList");

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      setValue("userTagList", tags);
    },
    [setValue],
  );

  useEffect(() => {
    if (userInfo) {
      setValue("nickname", userInfo.nickname);
      setValue("bio", userInfo.bio);
      setValue(
        "userTagList",
        userInfo.userTagList.map((tag) => tag.tag),
      );
    }
  }, [userInfo, setValue]);

  if (isLoading) {
    return (
      <div className='flex min-h-[calc(100vh-212px)] w-full items-center justify-center'>
        <DotLoader
          size={24}
          color={"#FF9A42"}
          cssOverride={{ position: "absolute" }}
          loading={isLoading}
        />
      </div>
    );
  }

  if (!userInfo || error) {
    throw new Error("프로필을 불러오는데 실패했습니다.");
  }

  const profile = userInfo;

  const getChangedFields = () => {
    const changes: {
      image?: File;
      requestData?: any;
    } = {};

    const requestData: any = {};

    if (watchedNickname !== profile.nickname) {
      requestData.nickname = watchedNickname;
    }

    if (watchedBio !== profile.bio) {
      requestData.bio = watchedBio;
    }

    if (
      watchedTags &&
      JSON.stringify([...watchedTags].sort()) !==
        JSON.stringify(profile.userTagList.map((tag) => tag.tag).sort())
    ) {
      requestData.userTagList = watchedTags;
    }

    if (selectedImage) {
      changes.image = selectedImage;
    }

    if (Object.keys(requestData).length > 0) {
      changes.requestData = requestData;
    }

    return changes;
  };

  const onSubmit = methods.handleSubmit(() => {
    const changes = getChangedFields();
    if (!changes) return;

    if (!changes.image && !changes.requestData) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append(
      "request",
      new Blob([JSON.stringify(changes.requestData || {})], {
        type: "application/json",
      }),
    );

    if (changes.image) {
      submitFormData.append("image", changes.image);
    }

    handleProfileUpdate(submitFormData);
  });

  const getButtonState = () => {
    if (Object.keys(errors).length > 0) return "inactive";
    if (isUpdating) return "inactive";

    const changes = getChangedFields();
    if (changes?.image || changes?.requestData) return "activated";

    return "default";
  };

  return (
    <FormProvider {...methods}>
      <form className='contents' onSubmit={onSubmit}>
        <ProfileImageInput
          profileImg={profile.profileImg}
          onImageSelect={setSelectedImage}
        />
        <p
          className='cursor-pointer text-label-normal font-regular text-orange-200'
          onClick={() => alert(SYSTEM_ALERTS.IN_PROGRESS)}
        >
          비밀번호 변경
        </p>
        <div className='flex w-full flex-col gap-8 *:w-full'>
          <CommonTextInput
            className='cursor-not-allowed bg-gray-800 text-gray-500'
            name='email'
            label='이메일 주소'
            aria-label='이메일 주소'
            value={profile.email}
            control={control}
            disabled
          />
          <CommonNicknameInput
            className={twMerge(
              "border-transparent bg-gray-800 text-gray-100",
              errors.nickname && "border-danger",
            )}
            control={control}
            isRequired={false}
          />
          <CommonTextArea
            containerClassName='bg-gray-800'
            formClassName='bg-gray-800 text-gray-100 h-40'
            name='bio'
            label='소개'
            placeholder='소개를 입력해주세요'
            control={control}
            maxLength={20}
            hint='최대 20자까지 입력 가능해요'
          />
          <TagInputField
            defaultTags={profile.userTagList}
            onTagsChange={handleTagsChange}
            name='userTag'
          />
        </div>
        <SolidButton className='my-14' state={getButtonState()}>
          {isUpdating ? "수정 중..." : "수정 완료"}
        </SolidButton>
      </form>
    </FormProvider>
  );
}
