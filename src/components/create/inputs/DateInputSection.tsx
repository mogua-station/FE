import MeetingDateInput from "./MeetingDateInput";
import RecruitmentDateInput from "./RecruitmentDateInput";
import { type DateRange } from "@/types/date.type";
import { type BaseFormProps } from "@/types/meetup.type";

interface DateInputSectionProps
  extends Pick<BaseFormProps, "watch" | "setValue"> {
  label: string;
  initDate: DateRange;
  onChange: (date: DateRange) => void;
  errorMessage?: string;
  isDisabled?: boolean;
}

export function DateInputSection({
  label,
  initDate,
  onChange,
  errorMessage,
  isDisabled,
}: DateInputSectionProps) {
  return (
    <div className='flex flex-col'>
      <label className='flex px-2 pb-4 text-body-2-normal font-medium text-gray-300 after:ml-0.5 after:mt-0.5 after:text-danger after:content-["*"]'>
        {label}
      </label>
      {label === "모집 기간" ? (
        <RecruitmentDateInput
          initDate={initDate}
          onChange={onChange}
          isDisabled={isDisabled}
        />
      ) : (
        <MeetingDateInput
          initDate={initDate}
          onChange={onChange}
          isDisabled={isDisabled}
        />
      )}
      <span
        className={`px-2 pt-2 text-label-normal font-medium ${errorMessage ? "text-danger" : "text-gray-500"}`}
      >
        {errorMessage ||
          (label === "모집 기간" && "모집이 생성되면 바로 모집이 시작돼요")}
      </span>
    </div>
  );
}
