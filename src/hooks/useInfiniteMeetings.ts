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
}

export const useInfiniteMeetings = ({
  tab,
  studyType,
  reviewTab,
}: UseInfiniteMeetingsProps) => {
  return useInfiniteQuery({
    // 캐시키: 값들이 변경되면 데이터를 다시 불러옴
    queryKey: ["meetings", tab, studyType, reviewTab],

    // 데이터 가져오는 함수 (현재는 fetchItems에서 mock 데이터 사용 중)
    queryFn: async ({ pageParam = 1 }) => {
      return fetchItems({
        tab,
        studyType,
        reviewTab,
        page: pageParam,
      });
    },

    // 다음 페이지 존재 여부 확인
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNextPage) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnMount: true, // 컴포넌트 마운트 시 데이터 재요청
    refetchOnWindowFocus: false, // 창 포커스 시 데이터 재요청하지 않음
  });
};
