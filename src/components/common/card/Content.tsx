import Image from "next/image";
import { type CardContentProps } from "@/types/card";

export default function Content({ content }: CardContentProps) {
  const locationFormat = (): string => {
    switch (content.location) {
      case "CAPITAL":
        return "수도권";

      case "DAEJEON":
        return "대전광역시";

      case "DAEGU":
        return "대구광역시";

      case "GWANGJU":
        return "광주광역시";

      case "BUSAN":
        return "부산광역시";

      case "JEONJU":
        return "전주시";

      case "GANGNEUNG":
        return "강릉시";
    }

    return "";
  };

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
            {locationFormat()}
          </span>
          <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>{`${content.participants.length}명 참여`}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex'>
            <span
              className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
            >
              모집
            </span>
            <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
              {new Date(content.recruitmentStartDate).toLocaleDateString(
                "ko-KR",
              )}{" "}
              -{" "}
              {new Date(content.recruitmentEndDate).toLocaleDateString("ko-KR")}
            </span>
          </div>
          <div className='flex'>
            <span
              className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
            >
              참여
            </span>
            <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
              {new Date(content.meetingStartDate).toLocaleDateString("ko-KR")} -{" "}
              {new Date(content.meetingEndDate).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-end'>
        <Image
          className='size-20 rounded-lg object-cover'
          src={content.thumbnail ? content.thumbnail : ""}
          width={80}
          height={80}
          alt='모임 이미지'
          priority
          loading='eager'
        />
      </div>
    </div>
  );
}
