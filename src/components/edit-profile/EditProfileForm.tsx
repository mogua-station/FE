"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { CommonNicknameInput } from "../auth/AuthInputs";
import CommonTextArea from "../common/inputs/TextArea";
import CommonTextInput from "../common/inputs/TextInput";
import ProfileImageInput from "./ProfileImageInput";
import TagInput from "./TagInput";
import SolidButton from "@/components/common/buttons/SolidButton";
import { SYSTEM_ALERTS } from "@/constants/alerts";
import useCookie from "@/hooks/auths/useTokenState";
import { useGetProfile, useUpdateProfile } from "@/hooks/user/useProfile";
import useUserStore from "@/store/auth/useUserStore";

type FormValues = {
  nickname: string;
  bio: string;
  userTagList: string[];
};

export default function EditProfileForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const token = useCookie("accessToken");
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const { data: userInfo, isLoading, error } = useGetProfile(user!.id, token!);

  const updateProfileMutation = useUpdateProfile();

  const methods = useForm<FormValues>({
    values: userInfo
      ? {
          nickname: userInfo.nickname,
          bio: userInfo.bio,
          userTagList: userInfo.userTagList?.map((tag) => tag.tag) || [],
        }
      : {
          nickname: "",
          bio: "",
          userTagList: [],
        },
    mode: "onChange",
  });

  if (isLoading || !userInfo) {
    return (
      <div className='flex min-h-[calc(100vh-64px)] items-center text-white'>
        로딩중...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-[calc(100vh-64px)] items-center text-white'>
        프로필을 불러오는데 실패했습니다. 다시 시도해주세요.
      </div>
    );
  }

  const {
    control,
    formState: { errors },
    watch,
  } = methods;

  const watchedNickname = watch("nickname");
  const watchedBio = watch("bio");
  const watchedTags = watch("userTagList");

  const handleTagsChange = (tags: string[]) => {
    methods.setValue("userTagList", tags);
  };

  const getChangedFields = () => {
    if (!userInfo) return null;

    const changes: {
      image?: File;
      requestData?: any;
    } = {};

    const requestData: any = {};

    if (watchedNickname !== userInfo.nickname) {
      requestData.nickname = watchedNickname;
    }

    if (watchedBio !== userInfo.bio) {
      requestData.bio = watchedBio;
    }

    if (
      watchedTags &&
      userInfo?.userTagList &&
      JSON.stringify([...watchedTags].sort()) !==
        JSON.stringify(userInfo.userTagList.map((tag) => tag.tag).sort())
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
    if (!token || !user) return;

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

    updateProfileMutation.mutate(
      { formData: submitFormData, token },
      {
        onSuccess: () => {
          setUser({
            ...user,
            name: watchedNickname || user.name,
            imageUrl: userInfo.profileImg || user.imageUrl,
          });
          router.push(`/user/${user.id}`);
        },
        onError: () => {
          alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
        },
      },
    );
  });

  const { email, profileImg } = userInfo;

  const getButtonState = () => {
    if (Object.keys(errors).length > 0) return "inactive";
    if (updateProfileMutation.isPending) return "inactive";

    const changes = getChangedFields();
    if (changes?.image || changes?.requestData) return "activated";

    return "default";
  };

  return (
    <FormProvider {...methods}>
      <form className='contents' onSubmit={onSubmit}>
        <ProfileImageInput
          profileImg={profileImg}
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
            value={email}
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
          <TagInput
            defaultTags={userInfo.userTagList}
            onTagsChange={handleTagsChange}
            name='userTag'
          />
        </div>
        <SolidButton className='my-14' state={getButtonState()}>
          {updateProfileMutation.isPending ? "수정 중..." : "수정 완료"}
        </SolidButton>
      </form>
    </FormProvider>
  );
}
