import { useState } from "react";
import type {
  Control,
  UseFormReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SolidButton from "../common/buttons/SolidButton";
import CommonTextArea from "../common/inputs/TextArea";
import { DateInputSection } from "./inputs/DateInputSection";
import { ParticipantsInput } from "./inputs/ParticipantsInput";
import { type MeetupFormType } from "@/types/meetup.type";
interface FormSectionRightProps {
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
  control: Control<MeetupFormType>;
  methods: UseFormReturn<MeetupFormType>;
  isSubmitDisabled: boolean;
  isEdit?: boolean;
}

export default function FormSectionRight({
  watch,
  setValue,
  control,
  methods,
  isSubmitDisabled,
  isEdit,
}: FormSectionRightProps) {
  const [dateError, setDateError] = useState<string | undefined>(undefined);

  const validateDates = (
    recruitmentEndDate: Date | null,
    meetingStartDate: Date | null,
    message: string,
  ) => {
    if (
      recruitmentEndDate &&
      meetingStartDate &&
      meetingStartDate < recruitmentEndDate
    ) {
      setDateError(message);
    } else {
      setDateError(undefined);
    }
  };

  return (
    <section className='flex flex-1 flex-col gap-10'>
      <CommonTextArea
        required={true}
        name='content'
        label='본문'
        control={control}
        rules={{
          required: "내용을 입력해주세요.",
        }}
        className='h-40 max-h-40 resize-none bg-gray-950'
      />

      <DateInputSection
        label='모집 기간'
        initDate={{
          startDate: watch("recruitmentStartDate"),
          endDate: watch("recruitmentEndDate"),
        }}
        onChange={(date) => {
          setValue("recruitmentEndDate", date.endDate);
          validateDates(
            date.endDate,
            watch("meetingStartDate"),
            "모집 기간은 진행 기간보다 미래일 수 없습니다.",
          );
        }}
        errorMessage={dateError}
        watch={watch}
        setValue={setValue}
        isDisabled={isEdit}
      />

      <DateInputSection
        label='진행 기간'
        initDate={{
          startDate: watch("meetingStartDate"),
          endDate: watch("meetingEndDate"),
        }}
        onChange={(date) => {
          setValue("meetingStartDate", date.startDate);
          setValue("meetingEndDate", date.endDate);
          validateDates(
            watch("recruitmentEndDate"),
            date.startDate,
            "진행 기간은 모집 기간보다 과거일 수 없습니다.",
          );
        }}
        errorMessage={dateError}
        watch={watch}
        setValue={setValue}
        isDisabled={isEdit}
      />

      <ParticipantsInput
        control={control}
        watch={watch}
        setValue={setValue}
        name='minParticipants'
        label='최소 인원'
        hasError={Boolean(methods.formState.errors.minParticipants)}
        isDisabled={isEdit}
        onDecrease={() => {
          if (watch("minParticipants") === 2) return;
          if (watch("minParticipants") < 2) {
            setValue("minParticipants", 2, { shouldValidate: true });
            return;
          }
          if (watch("minParticipants") > watch("maxParticipants")) {
            setValue("minParticipants", watch("maxParticipants"), {
              shouldValidate: true,
            });
            return;
          }
          setValue("minParticipants", watch("minParticipants") - 1, {
            shouldValidate: true,
          });
        }}
        onIncrease={() => {
          if (watch("minParticipants") === watch("maxParticipants")) return;
          if (watch("minParticipants") > watch("maxParticipants")) {
            setValue("minParticipants", watch("maxParticipants"), {
              shouldValidate: true,
            });
            return;
          }
          if (typeof watch("minParticipants") !== "number") {
            setValue("minParticipants", 2, { shouldValidate: true });
            return;
          }
          setValue("minParticipants", watch("minParticipants") + 1, {
            shouldValidate: true,
          });
        }}
      />

      <ParticipantsInput
        control={control}
        watch={watch}
        setValue={setValue}
        name='maxParticipants'
        label='모집 인원'
        hasError={Boolean(methods.formState.errors.maxParticipants)}
        isDisabled={isEdit}
        onDecrease={() => {
          if (watch("maxParticipants") === watch("minParticipants")) return;
          if (watch("maxParticipants") < watch("minParticipants")) {
            setValue("maxParticipants", watch("minParticipants"), {
              shouldValidate: true,
            });
            return;
          }
          if (watch("maxParticipants") > 10) {
            setValue("maxParticipants", 10, {
              shouldValidate: true,
            });
            return;
          }
          setValue("maxParticipants", watch("maxParticipants") - 1, {
            shouldValidate: true,
          });
        }}
        onIncrease={() => {
          if (watch("maxParticipants") === 10) return;
          if (typeof watch("maxParticipants") !== "number") {
            setValue("maxParticipants", 10, { shouldValidate: true });
            return;
          }
          if (watch("maxParticipants") < watch("minParticipants")) {
            setValue("maxParticipants", watch("minParticipants"), {
              shouldValidate: true,
            });
            return;
          }
          setValue("maxParticipants", watch("maxParticipants") + 1, {
            shouldValidate: true,
          });
        }}
      />

      <SolidButton
        type='submit'
        state={isSubmitDisabled ? "default" : "activated"}
        disabled={isSubmitDisabled}
      >
        완료
      </SolidButton>
    </section>
  );
}
