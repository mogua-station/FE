"use client";

import { FormProvider } from "react-hook-form";
import MeetupFormLeft from "./MeetupFormLeft";
import MeetupFormRight from "./MeetupFormRight";
import { useMeetupForm } from "@/hooks/forms/useMeetupForm";

export default function CreateForm({ id }: { id?: number }) {
  const {
    methods,
    onSubmit,
    isSubmitDisabled,
    meetupData,
    userInfo,
    control,
    watch,
    setValue,
    isEdit,
    setRemovedInitImage,
  } = useMeetupForm(id);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='z-10 mx-4 my-6 flex flex-col gap-10 desktop:my-8 desktop:flex-row desktop:gap-9'
      >
        <MeetupFormLeft
          initImage={meetupData?.thumbnail}
          control={control}
          watch={watch}
          setValue={setValue}
          isTutor={userInfo.data?.qualificationStatus === "QUALIFIED"}
          isEdit={isEdit}
          setRemovedInitImage={setRemovedInitImage}
        />
        <MeetupFormRight
          watch={watch}
          setValue={setValue}
          control={control}
          methods={methods}
          isSubmitDisabled={isSubmitDisabled}
          isEdit={isEdit}
        />
      </form>
    </FormProvider>
  );
}
