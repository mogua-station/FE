import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Card from "../common/card/Card";
import Review from "../common/review/Review";
import EmptyState from "./EmptyState";
import { useInfiniteMeetings } from "@/hooks/useInfiniteMeetings";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type UserPageSection,
  type MyReviewTab,
  type EmptyStateVariant,
  type StudyType,
} from "@/types/user-page";

interface MeetingListProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  variant: EmptyStateVariant;
}

export default function MeetingList({
  tab,
  studyType,
  reviewTab,
  variant,
}: MeetingListProps) {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteMeetings({
    tab,
    studyType,
    reviewTab,
  });

  // inView 감지시 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("다음 페이지 로드 중...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 모임 카드를 보여줄지 리뷰 카드를 보여줄지 결정
  const shouldShowMeetingCard =
    tab === "myMeeting" ||
    tab === "createdMeeting" ||
    (tab === "myReview" && reviewTab === "toWrite");

  // 로딩 중이거나 데이터가 없는 경우
  if (isLoading || !data?.pages[0]?.items.length) {
    return <EmptyState variant={variant} />;
  }

  return (
    <ul className='grid gap-y-6 desktop:grid-cols-2 desktop:gap-x-5'>
      {data.pages.map((page, pageIndex) =>
        page.items.map((item, itemIndex) => {
          const uniqueKey = `${pageIndex}-${itemIndex}-${
            shouldShowMeetingCard
              ? (item as CardProps).id
              : (item as ReviewInfo).userid
          }`;

          return shouldShowMeetingCard ? (
            <li key={uniqueKey}>
              <Card card={item as CardProps} />
            </li>
          ) : (
            <li key={uniqueKey}>
              <Review reviewInfo={item as ReviewInfo} />
            </li>
          );
        }),
      )}
      <div ref={ref} className='h-1' arria-hidden='true' />
    </ul>
  );
}
