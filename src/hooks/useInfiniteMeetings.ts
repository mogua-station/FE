import { useInfiniteQuery } from "@tanstack/react-query";
import { userContentApi } from "@/lib/user/userContent";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
  type ParticipatingMeetup,
  type CreatedMeetup,
  type EligibleReview,
  type WrittenReview,
  type ApiResponse,
  type PageResponse,
} from "@/types/user-page";
import {
  mapParticipatingMeetupToCard,
  mapCreatedMeetupToCard,
  mapEligibleReviewToCard,
  mapWrittenReviewToReviewInfo,
  transformPageResponse,
} from "@/utils/userContentMapper";

interface UseInfiniteMeetingsProps {
  tab: UserPageSection;
  studyType: StudyType;
  reviewTab?: MyReviewTab;
  userId: string;
  currentUserId: string;
  token: string;
}

export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
  userId,
  token,
}: UseInfiniteMeetingsProps) => {
  return useInfiniteQuery<
    PageResponse<CardProps | ReviewInfo>,
    Error,
    { pages: PageResponse<CardProps | ReviewInfo>[] },
    [string, UserPageSection, StudyType, MyReviewTab | undefined, string],
    number
  >({
    queryKey: ["meetings", tab, studyType, reviewTab, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const type = studyType === "study" ? "STUDY" : "TUTORING";

      try {
        switch (tab) {
          case "myMeeting": {
            console.log(
              `[참여중인 모임 요청] userId: ${userId}, type: ${type}, page: ${pageParam - 1}`,
            );
            const response = await userContentApi.getParticipating(
              userId,
              type,
              token,
              pageParam - 1,
            );
            const result =
              (await response.json()) as ApiResponse<ParticipatingMeetup>;
            console.log("[참여중인 모임 응답]", result);
            return transformPageResponse(result, mapParticipatingMeetupToCard);
          }

          case "createdMeeting": {
            console.log(
              `[만든 모임 요청] userId: ${userId}, type: ${type}, page: ${pageParam - 1}`,
            );
            const response = await userContentApi.getCreated(
              userId,
              type,
              token,
              pageParam - 1,
            );
            const result =
              (await response.json()) as ApiResponse<CreatedMeetup>;
            console.log("[만든 모임 응답]", result);
            return transformPageResponse(result, (item) =>
              mapCreatedMeetupToCard(item, type),
            );
          }

          case "myReview": {
            const status = reviewTab === "toWrite" ? "eligible" : "written";
            console.log(
              `[리뷰 요청] userId: ${userId}, type: ${type}, status: ${status}, page: ${pageParam - 1}`,
            );
            const response = await userContentApi.getWritten(
              userId,
              type,
              status,
              token,
              pageParam - 1,
            );

            if (status === "eligible") {
              const result =
                (await response.json()) as ApiResponse<EligibleReview>;
              console.log("[작성 가능한 리뷰 응답]", result);
              return transformPageResponse(result, (item) =>
                mapEligibleReviewToCard(item, type),
              );
            } else {
              const result =
                (await response.json()) as ApiResponse<WrittenReview>;
              console.log("[작성한 리뷰 응답]", result);
              return transformPageResponse(result, (item) => ({
                ...mapWrittenReviewToReviewInfo(item),
                eventType: type.toLowerCase(),
              }));
            }
          }

          case "classReview": {
            console.log(
              `[수강평 요청] userId: ${userId}, page: ${pageParam - 1}`,
            );
            const response = await userContentApi.getReceived(
              userId,
              token,
              pageParam - 1,
            );
            const result =
              (await response.json()) as ApiResponse<WrittenReview>;
            console.log("[수강평 응답]", result);
            return transformPageResponse(result, (item) => ({
              ...mapWrittenReviewToReviewInfo(item),
              eventType: "tutoring",
            }));
          }

          default:
            throw new Error("Invalid tab");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error fetching ${tab} data:`, error.message);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage: PageResponse<CardProps | ReviewInfo>) => {
      if (!lastPage.hasNextPage || lastPage.nextPage === -1) return undefined;
      return lastPage.nextPage;
    },
    initialPageParam: 1,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 30, // 30분 (이전의 cacheTime)
    refetchOnWindowFocus: false,
  });
};
