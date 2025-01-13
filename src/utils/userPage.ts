import {
  classReviews,
  createdStudyList,
  createdTutoringList,
  myStudyList,
  myTutoringList,
  reviewableStudyList,
  reviewableTutoringList,
  writtenReviews,
  writtenTutoringReviews,
} from "@/data/mock/mockUserCardData";
import { type CardProps } from "@/types/card";
import { type ReviewInfo } from "@/types/review";
import {
  type FetchConfig,
  type PageResponse,
  type StudyType,
  type UserPageSection,
} from "@/types/user-page";

const PAGE_SIZE = 10;

// 무한 스크롤 시뮬레이션을 위해 페이지 데이터를 반환하는 함수
function getMockPage<T>(data: T[], cursor: string = "1"): PageResponse<T> {
  const page = Number(cursor);
  const start = (page - 1) * PAGE_SIZE;
  const items = data.slice(start, start + PAGE_SIZE);

  return {
    items,
    pageInfo: {
      hasNextPage: start + PAGE_SIZE < data.length,
      nextCursor:
        start + PAGE_SIZE < data.length ? String(page + 1) : undefined,
    },
  };
}

// Mock Fetcher (나중에 실제 API로 교체 예정)
// 현재 탭에 따라 데이터를 가져오는 함수
export async function fetchItems<T extends CardProps | ReviewInfo>({
  tab,
  studyType,
  reviewTab,
  cursor,
}: FetchConfig): Promise<PageResponse<T>> {
  // API 호출 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Fetching:", {
    tab,
    studyType,
    reviewTab,
    cursor,
    timestamp: new Date().toISOString(),
  });

  switch (tab) {
    case "myMeeting":
      return getMockPage(
        studyType === "study" ? myStudyList : myTutoringList,
        cursor,
      ) as PageResponse<T>;

    case "myReview":
      if (reviewTab === "toWrite") {
        return getMockPage(
          studyType === "study" ? reviewableStudyList : reviewableTutoringList,
          cursor,
        ) as PageResponse<T>;
      }
      return getMockPage(
        studyType === "study" ? writtenReviews : writtenTutoringReviews,
        cursor,
      ) as PageResponse<T>;

    case "createdMeeting":
      return getMockPage(
        studyType === "study" ? createdStudyList : createdTutoringList,
        cursor,
      ) as PageResponse<T>;

    case "classReview":
      return getMockPage(classReviews, cursor) as PageResponse<T>;

    default:
      throw new Error("잘못된 탭");
  }
}

// 현재 탭에 따라 '스터디|과외' 필터를 표시할지 여부를 반환
export const shouldShowFilter = (
  tab: UserPageSection,
  isInstructor: boolean,
) => {
  return (
    tab === "myMeeting" ||
    (tab === "createdMeeting" && isInstructor) ||
    tab === "myReview"
  );
};

// 현재 탭에 따라 '스터디|과외' 필터의 기본값을 반환
export const getCurrentStudyType = (
  tab: UserPageSection,
  studyType: StudyType,
  isInstructor: boolean,
) => {
  if (tab === "classReview") return "tutoring";
  if (!isInstructor && tab === "createdMeeting") return "study";
  return studyType;
};
