import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type ApiResponse,
  type ParticipatingMeetup,
  type CreatedMeetup,
  type EligibleReview,
  type WrittenReview,
  type PageResponse,
} from "@/types/user-page";

// API 응답을 CardProps로 변환하는 함수
export const mapParticipatingMeetupToCard = (
  meetup: ParticipatingMeetup,
): CardProps => {
  return {
    meetupId: meetup.meetupId,
    title: meetup.title,
    meetingType: meetup.meetingType,
    location: meetup.location,
    minParticipants: meetup.minParticipants,
    recruitmentStartDate: new Date(meetup.recruitmentStartDate),
    recruitmentEndDate: new Date(meetup.recruitmentEndDate),
    meetingStartDate: new Date(meetup.meetingStartDate),
    meetingEndDate: new Date(meetup.meetingEndDate),
    thumbnail: meetup.thumbnail,
    online: meetup.online,
    participants: meetup.participants,
    meetupStatus: meetup.meetupStatus,
    isMypage: true,
  };
};

// 만든 모임 API 응답을 CardProps로 변환하는 함수
export const mapCreatedMeetupToCard = (
  meetup: CreatedMeetup,
  type: "STUDY" | "TUTORING",
): CardProps => {
  return {
    meetupId: meetup.meetupId,
    title: meetup.title,
    meetingType: type,
    location: meetup.location,
    minParticipants: 1,
    recruitmentStartDate: new Date(meetup.recruitmentStartDate),
    recruitmentEndDate: new Date(meetup.recruitmentEndDate),
    meetingStartDate: new Date(meetup.meetingStartDate),
    meetingEndDate: new Date(meetup.meetingEndDate),
    thumbnail: meetup.thumbnail,
    online: meetup.online,
    participants: Array(meetup.participants).fill({
      userId: 0,
      profileImageUrl: "",
    }),
    meetupStatus: meetup.meetupStatus,
    isMypage: true,
  };
};

// 작성 가능한 리뷰 API 응답을 CardProps로 변환하는 함수
export const mapEligibleReviewToCard = (
  review: EligibleReview,
  type: "STUDY" | "TUTORING",
): CardProps => {
  return {
    meetupId: review.meetupId,
    title: review.title,
    meetingType: type,
    location: review.location,
    minParticipants: review.minParticipants,
    recruitmentStartDate: new Date(review.recruitmentStartDate),
    recruitmentEndDate: new Date(review.recruitmentEndDate),
    meetingStartDate: new Date(review.meetingStartDate),
    meetingEndDate: new Date(review.meetingEndDate),
    thumbnail: review.thumbnail,
    online: review.online,
    participants: Array(review.participantsCount).fill({
      userId: 0,
      profileImageUrl: "",
    }),
    meetupStatus: review.status,
    isMypage: true,
    isReview: true,
  };
};

// 작성한 리뷰 API 응답을 ReviewInfo로 변환하는 함수
export const mapWrittenReviewToReviewInfo = (
  review: WrittenReview,
): Omit<ReviewInfo, "eventType"> => {
  return {
    userid: review.userId,
    username: review.nickname,
    userprofile: review.profileImg,
    rating: review.rating,
    title: review.title,
    review: review.content,
    date: new Date(review.reviewDate),
    meetingEndDate: new Date(review.meetingEndDate),
    isMyReview: true,
    eventId: review.meetupId,
    reviewId: review.reviewId,
    editable: review.editabel,
    thumbnail: review.thumbnail,
  };
};

// API 응답을 페이지네이션된 응답으로 변환하는 함수
export const transformPageResponse = <T, U>(
  response: ApiResponse<T>,
  mapper: (item: T) => U,
): PageResponse<U> => ({
  items: response.data.map(mapper),
  hasNextPage: !response.additionalData.isLast,
  nextPage: response.additionalData.nextPage,
});
