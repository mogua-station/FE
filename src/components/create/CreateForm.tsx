"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import FormSectionLeft from "./FormSectionLeft";
import FormSectionRight from "./FormSectionRight";
import { FailModal, SuccessModal } from "./modals/ResultInfoModal";
import useCookie from "@/hooks/auths/useTokenState";
import { createMeetup } from "@/lib/main/meetup.api";
import { getUserProfile } from "@/lib/user/getUserProfile";
import useUserStore from "@/store/auth/useUserStore";
import type { MeetupFormType } from "@/types/meetup.type";
import modal from "@/utils/modalController";

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
  const queryClient = useQueryClient();
  const userId = useUserStore(useShallow((state) => state.user?.userId));
  const accessToken = useCookie("accessToken");
  const useInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserProfile(userId!.toString(), accessToken!),
    retry: 1,
  });

  const createMeetupMutation = useMutation({
    mutationFn: createMeetup,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["meetup"] });
      modal.open(({ close }) => <SuccessModal data={data} close={close} />, {
        hasCloseBtn: false,
        isBottom: false,
        disableOverlayClick: true,
      });
    },
    onError: () => {
      modal.open(({ close }) => <FailModal close={close} />, {
        hasCloseBtn: false,
        isBottom: false,
      });
    },
  });

  const onSubmit: SubmitHandler<MeetupFormType> = async (data) => {
    try {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      formData.append("request", jsonBlob);

      if (image) {
        formData.append("image", image);
      }

      await createMeetupMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error creating meetup:", error);
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
          isTutor={useInfo.data?.qualificationStatus === "QUALIFIED"}
        />
        <FormSectionRight
          watch={watch}
          setValue={setValue}
          control={control}
          methods={methods}
          isSubmitDisabled={isSubmitDisabled}
        />
      </form>
    </FormProvider>
  );
}
