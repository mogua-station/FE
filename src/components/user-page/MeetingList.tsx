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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteMeetings({
      tab,
      studyType,
      reviewTab,
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

  if (isLoading)
    return <div className='flex justify-center py-4 text-white'>로딩중...</div>;

  // 첫 페지이 데이터가 없으면 EmptyState 표시
  if (!data?.pages[0]?.items.length) {
    return <EmptyState variant={emptyStateVariant} />;
  }

  // 카드 렌더링
  const renderItem = (item: CardProps | ReviewInfo, index: number) => {
    const isLastItem =
      index === data.pages.flatMap((page) => page.items).length - 1;

    if (shouldShowMeetingCard && "status" in item) {
      return (
        <li
          key={`meeting-${item.id}-${index}`}
          ref={isLastItem ? ref : undefined}
        >
          <Card card={item as CardProps} />
        </li>
      );
    }
    if (shouldShowReviewCard && "userid" in item) {
      return (
        <li
          key={`review-${item.userid}-${index}`}
          ref={isLastItem ? ref : undefined}
        >
          <Review reviewInfo={item as ReviewInfo} />
        </li>
      );
    }
    return null;
  };

  return (
    <section aria-label={`${tab} 목록`}>
      <ul className='grid flex-col gap-y-6 desktop:grid-cols-2 desktop:gap-x-5'>
        {data.pages.map((page, pageIndex) =>
          page.items.map((item, itemIndex) =>
            renderItem(item, pageIndex * 10 + itemIndex),
          ),
        )}
        {isFetchingNextPage && (
          <li className='col-span-full flex justify-center py-4 text-white'>
            로딩중...
          </li>
        )}
      </ul>
    </section>
  );
};
