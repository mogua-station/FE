import Megaphone from "@/assets/images/icons/announcement-megaphone.svg";
import Fire from "@/assets/images/icons/fire.svg";
import Hand from "@/assets/images/icons/waving-hand.svg";
import { type BadgeProps } from "@/types/card";

//recruitmentDate = new Date() 모집중이 아닐때 오류를 피하기 위한 설정?
export default function StatusBadge({
  status,
  recruitmentDate = new Date(),
}: BadgeProps) {
  const deadline = (date: Date) => {
    if (!recruitmentDate) return;

    const diffTime = +date - +new Date();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderBadge = (status: string) => {
    switch (status) {
      case "모집중":
        return (
          <div className='flex gap-1.5'>
            <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
              <Megaphone className='text-blue-300' />
              <span className='text-caption-normal font-medium text-blue-300'>
                모집 중
              </span>
            </span>
            <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
              <span className='text-caption-normal font-medium text-primary'>
                <span className='text-caption-normal font-medium text-primary'>
                  {deadline(recruitmentDate) == 0
                    ? "오늘 마감"
                    : `마감 D-${deadline(recruitmentDate)}`}
                </span>
              </span>
            </span>
          </div>
        );

      case "시작전":
        return (
          <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
            <span className='text-caption-normal font-medium text-gray-300'>
              {`시작 전 `}
            </span>
          </span>
        );

      case "진행중":
        return (
          <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
            <Fire className='text-red-300' />
            <span className='text-caption-normal font-medium text-red-300'>
              진행 중
            </span>
          </span>
        );

      case "종료":
        return (
          <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
            <Hand className='text-gray-300' />
            <span className='text-caption-normal font-medium text-gray-300'>
              모임 종료
            </span>
          </span>
        );
    }
  };

  return renderBadge(status);
}
