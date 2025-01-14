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
  type StudyType,
  type UserPageSection,
} from "@/types/user-page";

const PAGE_SIZE = 10;

const getMockPage = <T>(
  data: T[],
  page: number = 1,
  limit: number = PAGE_SIZE,
): PageResponse<T> => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = data.slice(start, end);
  const hasNextPage = end < data.length;

  return {
    items,
    hasNextPage,
  };
};

interface PageResponse<T> {
  items: T[];
  hasNextPage: boolean;
}

export const fetchItems = async ({
  tab,
  studyType,
  reviewTab,
  page,
}: FetchConfig): Promise<PageResponse<CardProps | ReviewInfo>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (tab) {
    case "myMeeting":
      return getMockPage(
        studyType === "study" ? myStudyList : myTutoringList,
        page,
      );

    case "myReview":
      if (reviewTab === "toWrite") {
        return getMockPage(
          studyType === "study" ? reviewableStudyList : reviewableTutoringList,
          page,
        );
      }
      return getMockPage(
        studyType === "study" ? writtenReviews : writtenTutoringReviews,
        page,
      );

    case "createdMeeting":
      return getMockPage(
        studyType === "study" ? createdStudyList : createdTutoringList,
        page,
      );

    case "classReview":
      return getMockPage(classReviews, page);

    default:
      throw new Error("Invalid tab");
  }
};

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
