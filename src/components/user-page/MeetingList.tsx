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

  return (
    <div className='flex flex-col gap-4'>
      {data.pages.map((page) =>
        page.items.map((item) => {
          if (shouldShowMeetingCard) {
            const cardItem = item as CardProps;
            return <Card key={cardItem.id} card={cardItem} />;
          }
          if (shouldShowReviewCard) {
            const reviewItem = item as ReviewInfo;
            return <Review key={reviewItem.userid} reviewInfo={reviewItem} />;
          }
          return null;
        }),
      )}
      <div ref={ref} aria-hidden='true' className='h-4' />
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
};
