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

  const shouldShowMeetingCard = useMemo(
    () =>
      tab === "myMeeting" ||
      tab === "createdMeeting" ||
      (tab === "myReview" && reviewTab === "toWrite"),
    [tab, reviewTab],
  );

  const shouldShowReviewCard = useMemo(
    () =>
      tab === "classReview" || (tab === "myReview" && reviewTab === "written"),
    [tab, reviewTab],
  );

  const emptyStateVariant = useMemo(
    () =>
      (tab === "myReview" && reviewTab
        ? { type: "myReview", tab: reviewTab }
        : tab) as EmptyStateVariant,
    [tab, reviewTab],
  );

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!data?.pages[0]?.items.length) {
    return <EmptyState variant={emptyStateVariant} />;
  }

  const renderItem = (item: CardProps | ReviewInfo, index: number) => {
    if (shouldShowMeetingCard && "status" in item) {
      return (
        <Card key={`meeting-${item.id}-${index}`} card={item as CardProps} />
      );
    }
    if (shouldShowReviewCard && "userid" in item) {
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
    <div className='grid flex-col gap-4 desktop:grid-cols-2'>
      {data.pages.map((page, pageIndex) =>
        page.items.map((item, itemIndex) =>
          renderItem(item, pageIndex * 10 + itemIndex),
        ),
      )}
      <div ref={ref} aria-hidden='true' className='h-4' />
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};
