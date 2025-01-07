"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import Heart from "@/assets/images/icons/heart.svg";
import HeartNoneActive from "@/assets/images/icons/heartNoneActive.svg";
import useFormatKrDate from "@/hooks/useFormatKrDate";
import { type CardProps } from "@/types/card";

export default function Card({
  id,
  status,
  itemType,
  title,
  location,
  participants,
  recruitmentPeriod,
  eventPeriod,
  image,
}: CardProps) {
  const router = useRouter();
  const formatKrDate = useFormatKrDate();

  const [whishlist, setWhishlist] = useState(false);

  //모의 기능입니다.
  const hadleClickWhishlist = (e: React.MouseEvent) => {
    //부모로 이벤트 전달 막기
    e.stopPropagation();
    setWhishlist((prev) => !prev);
  };

  const handleClickDetail = (type: string, id: number): void => {
    router.push(`/${type}/${id}`);
  };

  return (
    <div
      className='mb-6 flex flex-col gap-5 rounded-[16px] bg-gray-950 p-3'
      onClick={() => handleClickDetail(itemType, id)}
    >
      <div className='flex justify-between'>
        <div className='flex gap-1.5'>
          <StatusBadge
            status={status}
            recruitmentDate={
              status === "모집중" ? recruitmentPeriod.endDate : new Date()
            }
          />
        </div>

        <button onClick={hadleClickWhishlist}>
          {whishlist ? (
            <Heart className='size-6 text-red-300' />
          ) : (
            <HeartNoneActive className='size-6' />
          )}
        </button>
      </div>

      <div className='flex justify-between'>
        <div className='flex-col'>
          <span className='mb-1.5 block text-body-1-normal font-medium text-gray-200'>
            {title}
          </span>
          <div className='mb-6 flex'>
            <span
              className={`caption-stroke relative inline-block pr-2 text-label-reading font-regular text-gray-400`}
            >
              {location}
            </span>
            <span className='inline-block pl-2 text-label-reading font-regular text-gray-400'>{`${participants}명 참여`}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='flex'>
              <span
                className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
              >
                모집
              </span>
              <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
                {formatKrDate(recruitmentPeriod.startDate)} -{" "}
                {formatKrDate(recruitmentPeriod.endDate)}
              </span>
            </div>
            <div className='flex'>
              <span
                className={`caption-stroke relative inline-block pr-2 text-caption-normal font-regular text-gray-400`}
              >
                참여
              </span>
              <span className='inline-block pl-2 text-caption-normal font-regular text-gray-400'>
                {formatKrDate(eventPeriod.startDate)} -{" "}
                {formatKrDate(eventPeriod.endDate)}
              </span>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <img
            className='h-20 w-20 rounded-[8px] object-cover'
            src={image ? image : ""}
            alt='모임 이미지'
          />
        </div>
      </div>
    </div>
  );
}
