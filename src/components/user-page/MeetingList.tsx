import Card from "../common/card/Card";
import Review from "../common/review/Review";
import EmptyState from "./EmptyState";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type UserPageSection,
  type MyReviewTab,
  type EmptyStateVariant,
} from "@/types/user-page";

interface MeetingListProps {
  items: CardProps[] | ReviewInfo[];
  variant: UserPageSection | { type: "myReview"; tab: MyReviewTab };
}

export default function MeetingList({ items, variant }: MeetingListProps) {
  const shouldShowMeetingCard =
    variant === "myMeeting" ||
    variant === "createdMeeting" ||
    (typeof variant === "object" &&
      variant.type === "myReview" &&
      variant.tab === "toWrite");

  const shouldShowReviewCard =
    variant === "classReview" ||
    (typeof variant === "object" &&
      variant.type === "myReview" &&
      variant.tab === "written");

  if (items.length === 0) {
    return <EmptyState variant={variant as EmptyStateVariant} />;
  }

  return (
    <ul className='grid gap-4 desktop:gap-6'>
      {shouldShowMeetingCard &&
        (items as CardProps[]).map((item) => (
          <li key={item.id}>
            <Card card={item} />
          </li>
        ))}
      {shouldShowReviewCard &&
        (items as ReviewInfo[]).map((item) => (
          <li key={item.userid}>
            <Review reviewInfo={item} />
          </li>
        ))}
    </ul>
  );
}
