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
}

/**
 * 유저페이지 탭 데이터 캐싱 전략
 *
 * 1. 기본 동작
 * - 유저페이지 진입시: refetchOnMount로 인해 새로운 데이터 요청
 * - 각 탭 방문시: 처음 방문하는 탭은 새로운 데이터 요청, 10분 이내 재방문시 캐시 사용
 * - 10분 경과 후: 새로운 데이터 요청
 *
 * 2. 캐시 무효화 조건
 * - staleTime(10분) 경과시
 * - 리뷰 작성 완료시 '내 리뷰' 탭 데이터만 강제 무효화 예정
 *
 * 3. 쿼리 설정
 * refetchOnMount: true     // 유저 페이지 진입시 새로운 요청
 * staleTime: 10분         // 탭 이동시 10분 동안 캐시 사용
 * refetchOnWindowFocus: false  // 윈도우 포커스 변경시 요청 안함
 *
 * 4. 추후 작업
 * - 리뷰 작성 API 연동시 '내 리뷰' 탭 데이터 무효화 처리 필요
 * - 에러 처리 추가
 */
export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
  userId,
}: UseInfiniteMeetingsProps) => {
  const token = process.env.NEXT_PUBLIC_USER_TOKEN || "";

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

      switch (tab) {
        case "myMeeting": {
          const response = await userContentApi.getParticipating(
            userId,
            type,
            token,
            pageParam - 1,
          );
          const result =
            (await response.json()) as ApiResponse<ParticipatingMeetup>;
          return transformPageResponse(result, mapParticipatingMeetupToCard);
        }

        case "createdMeeting": {
          const response = await userContentApi.getCreated(
            userId,
            type,
            token,
            pageParam - 1,
          );
          const result = (await response.json()) as ApiResponse<CreatedMeetup>;
          return transformPageResponse(result, (item) =>
            mapCreatedMeetupToCard(item, type),
          );
        }

        case "myReview": {
          const status = reviewTab === "toWrite" ? "eligible" : "written";
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
            return transformPageResponse(result, (item) =>
              mapEligibleReviewToCard(item, type),
            );
          } else {
            const result =
              (await response.json()) as ApiResponse<WrittenReview>;
            return transformPageResponse(result, (item) => ({
              ...mapWrittenReviewToReviewInfo(item),
              eventType: type.toLowerCase(),
            }));
          }
        }

        case "classReview": {
          const response = await userContentApi.getReceived(
            userId,
            token,
            pageParam - 1,
          );
          const result = (await response.json()) as ApiResponse<WrittenReview>;
          return transformPageResponse(result, (item) => ({
            ...mapWrittenReviewToReviewInfo(item),
            eventType: "tutoring",
          }));
        }

        default:
          throw new Error("Invalid tab");
      }
    },
    getNextPageParam: (lastPage: PageResponse<CardProps | ReviewInfo>) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.items.length > 0 ? lastPage.items.length + 1 : undefined;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: false,
  });
};
