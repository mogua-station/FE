import { type CardContentProps } from "@/types/card";

export default function Content({ content }: CardContentProps) {
  return (
    <div className='mt-5 flex justify-between'>
      <div className='flex-col'>
        <span className='mb-1.5 block text-body-1-normal font-medium text-gray-200'>
          {content.title}
        </span>
        <div className='mb-6 flex'>
          <span
            className={`caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400`}
          >
            {content.location}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>{`${content.participants}명 참여`}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex'>
            <span
              className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
            >
              모집
            </span>
            <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
              {/* {content.recruitmentPeriod.startDate.toLocaleDateString("ko-KR")}{" "} */}
              {/* - {content.recruitmentPeriod.endDate.toLocaleDateString("ko-KR")} */}
            </span>
          </div>
          <div className='flex'>
            <span
              className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
            >
              참여
            </span>
            <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
              {/* {content.eventPeriod.startDate.toLocaleDateString("ko-KR")} -{" "}
              {content.eventPeriod.endDate.toLocaleDateString("ko-KR")} */}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-end'>
        <img
          className='h-20 w-20 rounded-[8px] object-cover'
          src={content.image ? content.image : ""}
          alt='모임 이미지'
        />
      </div>
    </div>
  );
}
