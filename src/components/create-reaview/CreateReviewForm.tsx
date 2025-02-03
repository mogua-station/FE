"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import SolidButton from "@/components/common/buttons/SolidButton";
import CommonTextArea from "@/components/common/inputs/TextArea";
import RatingInput from "@/components/create-reaview/RatingInput";
import ReviewImageInput from "@/components/create-reaview/ReviewImageInput";
import useCookie from "@/hooks/auths/useTokenState";
import { useReviewMutation } from "@/hooks/review/useReviewMutation";

interface ReviewFormData {
  rating: number;
  content: string;
  image: File | null;
  meetupId: number;
}

export default function CreateReviewForm({ meetupId }: { meetupId: string }) {
  const token = useCookie("accessToken");
  const router = useRouter();

  if (!token) {
    router.replace("/");
    return null;
  }

  if (!meetupId) {
    router.replace("/");
    return null;
  }

  const methods = useForm<ReviewFormData>({
    defaultValues: {
      rating: -1,
      content: "",
      image: null,
      meetupId: Number(meetupId),
    },
    mode: "onChange",
  });

  const { handleSubmit, setValue, watch } = methods;

  const rating = watch("rating");
  const content = watch("content");
  const isFormValid = rating !== -1 && content.trim() !== "";

  const createReviewMutation = useReviewMutation();

  const handleRatingChange = (value: number) => {
    setValue("rating", value);
  };

  const handleImageSelect = (image: File | null) => {
    setValue("image", image);
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    const requestData = {
      meetupId: Number(data.meetupId),
      rating: data.rating,
      content: data.content,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" }),
    );

    if (data.image) {
      formData.append("image", data.image);
    }

    if (data.image === null) {
      formData.append("image", new Blob(), "");
    }

    await createReviewMutation.mutateAsync({ formData, token });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-12'>
          <RatingInput
            value={methods.watch("rating")}
            onChange={handleRatingChange}
          />
          <CommonTextArea
            formClassName='h-40'
            required={true}
            name='content'
            label='구체적인 경험을 알려주세요'
            placeholder='모임의 장소, 환경, 진행, 구성 등 만족스러웠나요?'
            maxLength={150}
          />
          <ReviewImageInput onImageSelect={handleImageSelect} />
        </div>
        <SolidButton
          type='submit'
          className='mt-10'
          state={
            createReviewMutation.isPending || !isFormValid
              ? "inactive"
              : "activated"
          }
        >
          {createReviewMutation.isPending ? "작성 중..." : "작성 완료"}
        </SolidButton>
      </form>
    </FormProvider>
  );
}
