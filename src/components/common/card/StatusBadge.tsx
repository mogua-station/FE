import Megaphone from "@/assets/images/icons/announcement-megaphone.svg";
import Fire from "@/assets/images/icons/fire.svg";
import Hand from "@/assets/images/icons/waving-hand.svg";
import { type BadgeInfo } from "@/types/card";

//recruitmentDate = new Date() 모집중이 아닐때 오류를 피하기 위한 설정?
export default function StatusBadge({ badge }: BadgeInfo) {
  const deadline = (date: Date) => {
    if (date == null) return;

    const diffTime = +new Date(date) - +new Date();

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderBadge = () => {
    switch (badge.meetupStatus) {
      case "RECRUITING":
        return (
          <div className='flex gap-1.5'>
            <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
              <Megaphone className='text-blue-300' />
              <span className='text-caption-normal font-medium text-blue-300'>
                모집 중
              </span>
            </span>
            <span className='flex items-center justify-between rounded-[6px] bg-gray-800 px-2 py-1'>
              <span className='text-caption-normal font-medium text-primary'>
                {deadline(badge.recruitmentEndDate) == 0
                  ? "오늘 마감"
                  : `마감 D-${deadline(badge.recruitmentEndDate)}`}
              </span>
            </span>
            {badge.confirm && (
              <div className='flex gap-1.5'>
                <span className='flex items-center justify-between rounded-[6px] bg-gray-800 px-2 py-1'>
                  <span className='text-caption-normal font-medium text-primary'>
                    개설확정
                  </span>
                </span>
                {badge.isMypage && (
                  <span className='flex items-center justify-between rounded-[6px] bg-gray-800 px-2 py-1'>
                    <span className='text-caption-normal font-medium text-primary'>
                      이용 예정
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
        );

      case "BEFORE_START":
        return (
          <div className='flex gap-1.5'>
            <span className='flex items-center justify-between rounded-[6px] bg-gray-800 px-2 py-1'>
              <span className='text-caption-normal font-medium text-gray-300'>
                시작 전
              </span>
            </span>
            {badge.isMypage && (
              <span className='flex items-center justify-between rounded-[6px] bg-gray-800 px-2 py-1'>
                <span className='text-caption-normal font-medium text-primary'>
                  이용 예정
                </span>
              </span>
            )}
          </div>
        );

      case "IN_PROGRESS":
        return (
          <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
            <Fire className='text-red-300' />
            <span className='text-caption-normal font-medium text-red-300'>
              진행 중
            </span>
          </span>
        );

      case "COMPLETED":
        return (
          <div className='flex gap-1.5'>
            <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
              <Hand className='text-gray-300' />
              <span className='text-caption-normal font-medium text-gray-300'>
                모임 종료
              </span>
            </span>
            {badge.isMypage && (
              <span className='flex items-center justify-between gap-1.5 rounded-[6px] bg-gray-800 px-2 py-1'>
                <span className='text-caption-normal font-medium text-gray-300'>
                  이용 완료
                </span>
              </span>
            )}
          </div>
        );
    }
  };

  return renderBadge();
}
