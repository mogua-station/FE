import { type BaseFormProps } from "@/types/meetup.type";

interface MeetingTypeProps extends Pick<BaseFormProps, "watch" | "setValue"> {
  isTutor: boolean;
}

export default function MeetingTypeSelection({
  watch,
  setValue,
  isTutor,
}: MeetingTypeProps) {
  return (
    <div className='flex flex-col gap-3'>
      <label className='flex h-5 px-2 text-body-2-normal font-medium text-gray-300 after:ml-0.5 after:mt-0.5 after:text-danger after:content-["*"]'>
        모임 유형
      </label>
      <div className='flex gap-[.6875rem]'>
        <button
          type='button'
          onClick={() => {
            if (watch("meetingType") === "STUDY") return;
            setValue("meetingType", "STUDY");
          }}
          className={`${watch("meetingType") === "STUDY" ? "bg-orange-300 text-gray-100" : "bg-gray-800 text-gray-300"} h-[3.375rem] flex-1 rounded-2xl text-body-2-normal font-semibold transition-colors duration-300`}
        >
          스터디
        </button>
        {isTutor ? (
          <button
            type='button'
            onClick={() => {
              if (watch("meetingType") === "TUTORING") return;
              setValue("meetingType", "TUTORING");
            }}
            className={`${watch("meetingType") === "TUTORING" ? "bg-orange-300 text-gray-100" : "bg-gray-800 text-gray-300"} h-[3.375rem] flex-1 rounded-2xl text-body-2-normal font-semibold transition-colors duration-300`}
          >
            과외
          </button>
        ) : (
          <div className='flex-1' />
        )}
      </div>
    </div>
  );
}
