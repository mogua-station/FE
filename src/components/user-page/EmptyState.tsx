import Link from "next/link";
import SolidButton from "../common/buttons/SolidButton";
import EmptyImage from "@/assets/images/icons/empty.svg";
import {
  type EmptyStateVariant,
  type EmptyStateConfig,
  type EmptyStateProps,
} from "@/types/user-page";

export default function EmptyState({
  variant = "myMeeting",
  isMe,
}: EmptyStateProps) {
  const paragraphStyle =
    "text-center text-body-1-reading font-regular text-gray-500";

  const emptyStateConfig: EmptyStateConfig = {
    myMeeting: {
      marginTop: "mt-[134px] tablet:mt-[104px]",
      content: <p className={paragraphStyle}>아직 내 모임이 없어요</p>,
    },
    myReview: {
      toWrite: {
        marginTop: "mt-[72px]",
        content: <p className={paragraphStyle}>작성 가능한 리뷰가 없어요</p>,
      },
      written: {
        marginTop: "mt-[72px]",
        content: <p className={paragraphStyle}>작성한 리뷰가 없어요</p>,
      },
    },
    createdMeeting: {
      marginTop: "mt-[72px] tablet:mt-[104px] desktop:mt-[243px]",
      content: (
        <>
          <p className={paragraphStyle}>아직 만든 모임이 없어요</p>
          {isMe && (
            <>
              <p className={paragraphStyle}>새로운 모임을 만들어보세요</p>
              <Link href='/create'>
                <SolidButton className='mt-8'>모임 개설하기</SolidButton>
              </Link>
            </>
          )}
        </>
      ),
    },
    classReview: {
      marginTop: "mt-[104px]",
      content: <p className={paragraphStyle}>등록된 수강평이 없어요</p>,
    },
  };

  // variant에 따라 적절한 설정을 반환
  // string이면 직접 접근, myReview면 tab 상태까지 확인
  const getConfig = (variant: EmptyStateVariant) => {
    if (typeof variant === "string") {
      return emptyStateConfig[variant];
    }
    return emptyStateConfig.myReview[variant.tab];
  };

  const { marginTop, content } = getConfig(variant);

  return (
    <div className={`flex flex-col items-center ${marginTop}`}>
      <EmptyImage />
      <div className='mt-4 max-w-[244px]'>{content}</div>
    </div>
  );
}
