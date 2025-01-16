"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import CommonTextArea from "../common/inputs/TextArea";
import CommonTextInput from "../common/inputs/TextInput";
import ProfileImageInput from "./ProfileImageInput";
import TagInput from "./TagInput";
import { updateProfile } from "@/app/user/edit_profile/action";
import { USER_ID } from "@/app/user/edit_profile/page";
import SolidButton from "@/components/common/buttons/SolidButton";
import { SYSTEM_ALERTS } from "@/constants/\balerts";

type UserProfile = {
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

  const router = useRouter();

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
    watch,
  } = methods;

  const watchedNickname = watch("nickname");
  const watchedBio = watch("bio");
  const watchedTags = watch("userTagList");

  const handleTagsChange = (tags: string[]) => {
    methods.setValue("userTagList", tags);
  };

  const getChangedFields = () => {
    const changes: {
      formData?: FormData;
      requestData?: any;
    } = {};

    const requestData: any = {};

    if (watchedNickname !== nickname) {
      requestData.nickname = watchedNickname;
    }

    if (watchedBio !== bio) {
      requestData.bio = watchedBio;
    }

    if (
      JSON.stringify(watchedTags.sort()) !==
      JSON.stringify(userTagList.map((tag) => tag.tag).sort())
    ) {
      requestData.userTagList = watchedTags;
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

  const onSubmit = methods.handleSubmit(async () => {
    const changes = getChangedFields();

    // 변경사항이 없으면 얼리 리턴
    if (!changes.formData && !changes.requestData) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    const submitFormData = new FormData();

    // 변경사항이 없어도 최소한 빈 객체라도 request로 보내기
    submitFormData.append(
      "request",
      new Blob([JSON.stringify(changes.requestData || {})], {
        type: "application/json",
      }),
    );

    // 이미지가 있는 경우에만 추가
    if (changes.formData) {
      const imageFile = changes.formData.get("image");
      if (imageFile) {
        submitFormData.append("image", imageFile);
      }
    }

    const result = await updateProfile(submitFormData);

    if (result.success) {
      router.replace(`/user/${USER_ID}`); // TODO: 임시 로그인유저 ID 사용(스토어로 관리 예정)
    } else {
      alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
      throw new Error(result.error);
    }
  });

  const getButtonState = () => {
    // 에러가 있으면 무조건 inactive
    if (Object.keys(errors).length > 0) return "inactive";

    // 실제 변경사항만 확인
    const changes = getChangedFields();
    if (changes.formData || changes.requestData) return "activated";

    // 그 외의 경우는 default
    return "default";
  };

  return (
    <FormProvider {...methods}>
      <form className='contents' onSubmit={onSubmit}>
        {/* TODO: IndexedDB용 공용 컴포넌트로 교체 예정 */}
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
          <CommonTextInput
            className={twMerge(
              "bg-gray-800 text-gray-100",
              !errors.nickname &&
                "border-gray-700 hover:border-gray-700 focus:border-gray-700",
            )}
            name='nickname'
            label='닉네임'
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
          <CommonTextArea
            className='h-40 max-h-40 resize-none bg-gray-800 text-gray-100'
            name='bio'
            label='소개'
            placeholder='소개를 입력해주세요'
            control={control}
            maxLength={20}
            hint='최대 20자까지 입력 가능해요'
          />
          <TagInput
            defaultTags={userTagList}
            onTagsChange={handleTagsChange}
            name='userTag'
          />
        </div>
        <SolidButton className='my-14' state={getButtonState()}>
          수정 완료
        </SolidButton>
      </form>
    </FormProvider>
  );
}
