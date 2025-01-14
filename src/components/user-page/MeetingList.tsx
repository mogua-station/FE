import { useEffect, useMemo } from "react";
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
  type StudyType,
  type EmptyStateVariant,
} from "@/types/user-page";

interface MeetingListProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
}

export const MeetingList = ({
  tab,
  studyType,
  reviewTab,
}: MeetingListProps) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteMeetings({
      tab,
      studyType,
      reviewTab,
    });

  // 모임 카드를 보여줄 조건
  const shouldShowMeetingCard = useMemo(
    () =>
      tab === "myMeeting" || // 내 모임
      tab === "createdMeeting" || // 만든모임
      (tab === "myReview" && reviewTab === "toWrite"), // 내 리뷰 탭의 작성가능 필터
    [tab, reviewTab],
  );

  // 리뷰 카드를 보여줄 조건
  const shouldShowReviewCard = useMemo(
    () =>
      tab === "classReview" || // 수강평
      (tab === "myReview" && reviewTab === "written"), // 내 리뷰 탭의 작성한 필터
    [tab, reviewTab],
  );

  // EmptyState에 전달할 variant 결정
  const emptyStateVariant = useMemo(
    () =>
      (tab === "myReview" && reviewTab
        ? { type: "myReview", tab: reviewTab } // 내 리뷰 탭은 작성가능/작성한 상태도 전달
        : tab) as EmptyStateVariant, // 그 외에는 탭 정보만 전달
    [tab, reviewTab],
  );

  useEffect(() => {
    // inView: 스크롤이 맨 아래에 도달했는지 감지
    // hasNextPage: 다음 페이지가 존재하는지 (현재는 목데이터 함수 사용 중)
    // !isFetchingNextPage: 데이터를 가져오는 중이 아닌지
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 첫 페지이 데이터가 없으면 EmptyState 표시
  if (!data?.pages[0]?.items.length) {
    return <EmptyState variant={emptyStateVariant} />;
  }

  // 카드 렌더링
  const renderItem = (item: CardProps | ReviewInfo, index: number) => {
    if (shouldShowMeetingCard && "status" in item) {
      // 모임 카드 조건이 true이고 item에 status가 있으면
      return (
        <Card key={`meeting-${item.id}-${index}`} card={item as CardProps} /> // key는 목데이터의 id 중복 문제 해결을 위해 임시로 사용 (추후 변경 예정)
      );
    }
    if (shouldShowReviewCard && "userid" in item) {
      // 리뷰 카드 조건이 true이고 userId 속성이 있으면
      return (
        <Review
          key={`review-${item.userid}-${index}`}
          reviewInfo={item as ReviewInfo}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <div className='grid flex-col gap-4 desktop:grid-cols-2'>
        {data.pages.map((page, pageIndex) =>
          page.items.map((item, itemIndex) =>
            renderItem(item, pageIndex * 10 + itemIndex),
          ),
        )}
      </div>
      <div ref={ref} aria-hidden='true' className='h-4' />
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};
