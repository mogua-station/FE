import type {
  Control,
  UseFormReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SolidButton from "../common/buttons/SolidButton";
import { DateInputSection } from "./inputs/DateInputSection";
import { MeetingTypeSection } from "./inputs/MeetingTypeSection";
import { ParticipantsInput } from "./inputs/ParticipantsInput";
import { type MeetupFormType } from "@/types/meetup.type";
interface FormSectionRightProps {
  watch: UseFormWatch<MeetupFormType>;
  setValue: UseFormSetValue<MeetupFormType>;
  control: Control<MeetupFormType>;
  methods: UseFormReturn<MeetupFormType>;
  isSubmitDisabled: boolean;
  dateError: string;
  validateDates: (
    recruitmentEndDate: Date | null,
    meetingStartDate: Date | null,
  ) => void;
}

export default function FormSectionRight({
  watch,
  setValue,
  control,
  methods,
  isSubmitDisabled,
  dateError,
  validateDates,
}: FormSectionRightProps) {
  return (
    <section className='flex flex-1 flex-col gap-10'>
      <MeetingTypeSection
        watch={watch}
        setValue={setValue}
        isOnline={watch("isOnline")}
      />

      <DateInputSection
        label='모집 기간'
        initDate={{
          startDate: watch("recruitmentStartDate"),
          endDate: watch("recruitmentEndDate"),
        }}
        onChange={(date) => {
          setValue("recruitmentEndDate", date.endDate);
          validateDates(date.endDate, watch("meetingStartDate"));
        }}
        errorMessage={dateError}
        watch={watch}
        setValue={setValue}
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
          validateDates(watch("recruitmentEndDate"), date.startDate);
        }}
        errorMessage={dateError}
        watch={watch}
        setValue={setValue}
      />

      <ParticipantsInput
        control={control}
        watch={watch}
        setValue={setValue}
        name='minParticipants'
        label='최소 인원'
        hasError={Boolean(methods.formState.errors.minParticipants)}
        onDecrease={() => {
          if (watch("minParticipants") === 2) return;
          setValue("minParticipants", watch("minParticipants") - 1);
        }}
        onIncrease={() => {
          if (watch("minParticipants") === watch("maxParticipants")) return;
          setValue("minParticipants", watch("minParticipants") + 1);
        }}
      />

      <ParticipantsInput
        control={control}
        watch={watch}
        setValue={setValue}
        name='maxParticipants'
        label='모집 인원'
        hasError={Boolean(methods.formState.errors.maxParticipants)}
        onDecrease={() => {
          if (watch("maxParticipants") === watch("minParticipants")) return;
          setValue("maxParticipants", watch("maxParticipants") - 1);
        }}
        onIncrease={() => {
          if (watch("maxParticipants") === 10) return;
          setValue("maxParticipants", watch("maxParticipants") + 1);
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
