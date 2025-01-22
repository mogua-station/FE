"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import SolidButton from "@/components/common/buttons/SolidButton";
import CommonTextArea from "@/components/common/inputs/TextArea";
import RatingInput from "@/components/create-reaview/RatingInput";
import ReviewImageInput from "@/components/create-reaview/ReviewImageInput";

interface ReviewFormData {
  rating: number;
  content: string;
  thumbnail: File | null;
  meetupId: number;
}

export default function CreateReviewForm() {
  const searchParams = useSearchParams();
  const meetUpId = searchParams.get("meetupId");

  const methods = useForm<ReviewFormData>({
    defaultValues: {
      rating: -1,
      content: "",
      thumbnail: null,
      meetupId: Number(meetUpId),
    },
  });

  const { handleSubmit, setValue, watch, formState } = methods;
  const { isSubmitting } = formState;

  // 필수 입력값들 감시
  const rating = watch("rating");
  const content = watch("content");

  // 버튼 상태 계산
  const isFormValid = rating !== -1 && content.trim().length > 0;
  const buttonState = isSubmitting
    ? "inactive"
    : !isFormValid
      ? "inactive"
      : "activated";

  const handleRatingChange = (value: number) => {
    setValue("rating", value);
  };

  const handleImageSelect = (image: File | null) => {
    setValue("thumbnail", image);
  };

  const onSubmit = (data: ReviewFormData) => {
    // TODO: API 연결
    console.log("제출된 데이터:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-12'>
          <RatingInput value={rating} onChange={handleRatingChange} />
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
        <SolidButton type='submit' className='mt-10' state={buttonState}>
          작성 완료
        </SolidButton>
      </form>
    </FormProvider>
  );
}
