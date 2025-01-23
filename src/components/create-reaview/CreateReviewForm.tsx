"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import SolidButton from "@/components/common/buttons/SolidButton";
import CommonTextArea from "@/components/common/inputs/TextArea";
import RatingInput from "@/components/create-reaview/RatingInput";
import ReviewImageInput from "@/components/create-reaview/ReviewImageInput";
import useCookie from "@/hooks/auths/useTokenState";

import { fetcher } from "@/lib/user/fetcher";
import useUserStore from "@/store/auth/useUserStore";

interface ReviewFormData {
  rating: number;
  content: string;
  image: File | null;
  meetupId: number;
}

export default function CreateReviewForm() {
  const searchParams = useSearchParams();
  const meetUpId = searchParams.get("meetupId");
  const token = useCookie("accessToken");
  const { user } = useUserStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!meetUpId) {
    router.replace("/");
    return null;
  }

  const methods = useForm<ReviewFormData>({
    defaultValues: {
      rating: -1,
      content: "",
      image: null,
      meetupId: Number(meetUpId),
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;

  const rating = watch("rating");
  const content = watch("content");
  const isFormValid = rating !== -1 && content.trim() !== "";

  const createReviewMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!token) throw new Error("로그인이 필요합니다.");

      const res = await fetcher("/reviews", token, {
        method: "POST",
        body: formData,
        auth: true,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("서버 응답 에러:", errorData);
        throw new Error("리뷰 작성에 실패했습니다.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "study"],
      });
      queryClient.invalidateQueries({
        queryKey: ["meetings", "myReview", "tutoring"],
      });
      router.replace(`/user/${user?.userId}`);
    },
  });

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

    await createReviewMutation.mutateAsync(formData);
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
          state={isSubmitting || !isFormValid ? "inactive" : "activated"}
        >
          {isSubmitting ? "작성 중..." : "작성 완료"}
        </SolidButton>
      </form>
    </FormProvider>
  );
}
