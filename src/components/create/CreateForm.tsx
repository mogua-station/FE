"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import SolidButton from "../common/buttons/SolidButton";
import FormSectionLeft from "./FormSectionLeft";
import FormSectionRight from "./FormSectionRight";
import useModal from "@/hooks/useModal";
import { createMeetup } from "@/lib/main/meetup.api";
import type { MeetupFormType } from "@/types/meetup.type";

export default function CreateForm() {
  const methods = useForm<MeetupFormType>({
    defaultValues: {
      title: "",
      meetingType: "STUDY",
      location: "",
      content: "",
      recruitmentStartDate: new Date(),
      recruitmentEndDate: null,
      meetingStartDate: null,
      meetingEndDate: null,
      minParticipants: 2,
      maxParticipants: 10,
      isOnline: false,
    },
    mode: "onChange",
  });

  const { control, handleSubmit, watch, setValue } = methods;

  const [image, setImage] = useState<File | null>(null);

  const [dateError, setDateError] = useState<string | null>(null);

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const createMeetupMutation = useMutation({
    mutationFn: createMeetup,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      console.log("Meetup created successfully:", data);

      openModal({
        hasCloseBtn: false,
        children: (
          <div className='flex w-[17.6875rem] flex-col items-center p-6'>
            <p className='pb-3 text-heading-2 font-medium text-gray-100'>
              모임 개설 완료
            </p>
            <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
              모임 개설이 완료되었어요
            </p>
            <div className='flex w-full gap-[.4375rem]'>
              <SolidButton
                onClick={() => {
                  closeModal();
                  router.push("/");
                }}
              >
                목록으로
              </SolidButton>
              <SolidButton
                onClick={() => {
                  closeModal();
                  router.push(`/study/${data.data.meetupId}`);
                }}
                state='activated'
              >
                보러가기
              </SolidButton>
            </div>
          </div>
        ),
      });
    },
    onError: (error: Error) => {
      console.error("Error creating meetup:", error);

      openModal({
        hasCloseBtn: false,
        children: (
          <div className='flex w-[17.6875rem] flex-col items-center p-6'>
            <p className='pb-3 text-heading-2 font-medium text-gray-100'>
              모임 개설 실패패
            </p>
            <p className='pb-6 text-body-2-normal font-medium text-gray-400'>
              모임 개설 중 오류가 발생했어요.
            </p>
            <div className='flex w-full gap-[.4375rem]'>
              <SolidButton onClick={() => closeModal()}>닫기</SolidButton>
            </div>
          </div>
        ),
      });
    },
  });

  const onSubmit: SubmitHandler<MeetupFormType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("request", JSON.stringify(data));
      formData.append("image", image || "");
      console.log("Meetup form data:", formData.get("request"));
      console.log("Meetup image data:", formData.get("image"));

      await createMeetupMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating meetup:", error);
    }
  };

  const validateDates = (
    recruitmentEndDate: Date | null,
    meetingStartDate: Date | null,
  ) => {
    if (
      recruitmentEndDate &&
      meetingStartDate &&
      meetingStartDate < recruitmentEndDate
    ) {
      setDateError("진행 기간은 모집 기간보다 과거일 수 없습니다.");
    } else {
      setDateError(null);
    }
  };

  const isSubmitDisabled =
    watch("title") === "" ||
    watch("content") === "" ||
    watch("recruitmentEndDate") === null ||
    watch("meetingStartDate") === null ||
    watch("meetingEndDate") === null ||
    (watch("isOnline") === false && watch("location") === null);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='z-10 mx-4 my-6 flex flex-col gap-10 desktop:my-8 desktop:flex-row desktop:gap-9'
      >
        <FormSectionLeft
          setImage={setImage}
          control={control}
          watch={watch}
          setValue={setValue}
        />
        <FormSectionRight
          watch={watch}
          setValue={setValue}
          control={control}
          methods={methods}
          isSubmitDisabled={isSubmitDisabled}
          dateError={dateError || ""}
          validateDates={validateDates}
        />
      </form>
    </FormProvider>
  );
}
