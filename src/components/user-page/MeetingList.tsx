import { useInView } from "react-intersection-observer";
import Card from "../common/card/Card";
import Review from "../common/review/Review";
import SkeletonList from "../common/skeleton/SkeletonList";
import EmptyState from "./EmptyState";
import { useInfiniteMeetings } from "@/hooks/useInfiniteMeetings";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type EmptyStateVariant,
  isMeetingCard,
  isReviewInfo,
  type MeetingListProps,
} from "@/types/user-page";

export const MeetingList = ({
  userId,
  tab,
  studyType,
  reviewTab,
  isMe,
}: MeetingListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteMeetings({
      tab,
      studyType,
      reviewTab,
      userId,
      currentUserId: userId,
    });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // 모임 카드를 보여줄 조건
  const shouldShowMeetingCard =
    tab === "myMeeting" || // 내 모임
    tab === "createdMeeting" || // 만든모임
    (tab === "myReview" && reviewTab === "toWrite"); // 내 리뷰 탭의 작성가능 필터

  // 리뷰 카드를 보여줄 조건
  const shouldShowReviewCard =
    tab === "classReview" || // 수강평
    (tab === "myReview" && reviewTab === "written"); // 내 리뷰 탭의 작성한 필터

  // EmptyState에 전달할 variant 결정
  const emptyStateVariant = (
    tab === "myReview" && reviewTab
      ? { type: "myReview", tab: reviewTab } // 내 리뷰 탭은 작성가능/작성한 상태도 전달
      : tab
  ) as EmptyStateVariant; // 그 외에는 탭 정보만 전달

  if (isLoading) {
    return <SkeletonList base={3} tablet={3} desktop={8} />;
  }

  // 첫 페지이 데이터가 없으면 EmptyState 표시
  if (!data?.pages[0]?.items.length) {
    return <EmptyState variant={emptyStateVariant} isMe={isMe} />;
  }

  // 카드 렌더링
  const renderItem = (item: CardProps | ReviewInfo, index: number) => {
    const isLastItem =
      index === data.pages.flatMap((page) => page.items).length - 1;

    if (shouldShowMeetingCard && isMeetingCard(item)) {
      const isReview =
        tab === "myReview" && reviewTab === "toWrite" && isMe && item.isReview;

      return (
        <li
          key={`meeting-${item.meetupId}-${index}`}
          ref={isLastItem ? ref : undefined}
        >
          <Card card={{ ...item, isReview }} />
        </li>
      );
    }
    if (shouldShowReviewCard && isReviewInfo(item)) {
      return (
        <li
          key={`review-${item.userid}-${index}`}
          ref={isLastItem ? ref : undefined}
        >
          <Review reviewInfo={item} />
        </li>
      );
    }
    return null;
  };

  return (
    <section aria-label={`${tab} 목록`}>
      <ul className='grid flex-col gap-y-6 desktop:grid-cols-2 desktop:gap-x-5'>
        {data.pages.map((page, pageIndex) =>
          page.items.map((item, itemIndex) => {
            const globalIndex = pageIndex * page.items.length + itemIndex;
            return renderItem(item, globalIndex);
          }),
        )}
        {isFetchingNextPage && <SkeletonList base={3} tablet={3} desktop={4} />}
      </ul>
    </section>
  );
};
