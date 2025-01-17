import { type BaseFormProps } from "@/types/meetup.type";

interface MeetingTypeProps extends Pick<BaseFormProps, "watch" | "setValue"> {
  isOnline: boolean;
}

export function MeetingTypeSection({ watch, setValue }: MeetingTypeProps) {
  return (
    <div className='flex flex-col gap-3'>
      <label className='flex h-5 px-2 text-body-2-normal font-medium text-gray-300 after:ml-0.5 after:mt-0.5 after:text-danger after:content-["*"]'>
        모임 유형
      </label>
      <div className='flex gap-[.6875rem]'>
        <button
          type='button'
          onClick={() => {
            if (watch("isOnline") === true) return;
            setValue("isOnline", true);
          }}
          className={`${watch("isOnline") === true ? "bg-orange-300 text-gray-100" : "bg-gray-800 text-gray-300"} h-[3.375rem] flex-1 rounded-2xl text-body-2-normal font-semibold transition-colors duration-300`}
        >
          온라인
        </button>
        <button
          type='button'
          onClick={() => {
            if (watch("isOnline") === false) return;
            setValue("isOnline", false);
          }}
          className={`${watch("isOnline") === false ? "bg-orange-300 text-gray-100" : "bg-gray-800 text-gray-300"} h-[3.375rem] flex-1 rounded-2xl text-body-2-normal font-semibold transition-colors duration-300`}
        >
          오프라인
        </button>
      </div>
    </div>
  );
}
