import { useInfiniteQuery } from "@tanstack/react-query";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
} from "@/types/user-page";
import { fetchItems } from "@/utils/userPage";

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
  currentUserId,
}: UseInfiniteMeetingsProps) => {
  return useInfiniteQuery({
    // 캐시키: 값들이 변경되면 데이터를 다시 불러옴
    queryKey: ["meetings", tab, studyType, reviewTab, userId],

    // 데이터 가져오는 함수 (현재는 fetchItems에서 mock 데이터 사용 중)
    queryFn: async ({ pageParam = 1 }) => {
      return fetchItems({
        tab,
        studyType,
        reviewTab,
        page: pageParam,
        userId,
        currentUserId,
      });
    },

    // 다음 페이지 존재 여부 확인
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
