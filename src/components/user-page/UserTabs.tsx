"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { MeetingList } from "./MeetingList";
import ReviewTabs from "./ReviewTabs";
import StudyTypeFilter from "./StudyTypeFilter";
import TabList from "./TabList";
import {
  type UserPageSection,
  type MyReviewTab,
  type StudyType,
  type UserTabsProps,
} from "@/types/user-page";
import { getCurrentStudyType, shouldShowFilter } from "@/utils/userPage";

// 초기 상태 상수로 분리
const INITIAL_STATE = {
  tab: "myMeeting" as UserPageSection, // 현재 선택된 탭
  studyType: "study" as StudyType, // 스터디/과외 필터 상태
  reviewTab: "toWrite" as MyReviewTab, // 리뷰 필터 상태
};

export default function UserTabs({
  ownId,
  isInstructor = false,
}: UserTabsProps) {
  const params = useParams();
  const userId = params.id as string;

  // 상태 통합 관리
  const [filters, setFilters] = useState(INITIAL_STATE);
  const { tab, studyType, reviewTab } = filters;

  // 탭 변경시 (예: '내 모임' -> '내 리뷰' 탭 클릭)
  const handleTabChange = (newTab: UserPageSection) => {
    setFilters((prev) => ({
      ...prev,
      tab: newTab,
      studyType: newTab === "classReview" ? "tutoring" : "study", // 수강평 탭으로 가면 과외로 설정
      reviewTab: "toWrite", // 리뷰 필터 상태 초기화
    }));
  };

  // 스터디/과외 필터 변경시
  const handleStudyTypeChange = (newStudyType: StudyType) => {
    setFilters((prev) => ({
      ...prev,
      studyType: newStudyType,
    }));
  };

  // 리뷰 필터 변경시 (작성가능/작성한)
  const handleReviewTabChange = (newReviewTab: MyReviewTab) => {
    setFilters((prev) => ({
      ...prev,
      reviewTab: newReviewTab,
    }));
  };

  // 스터디/과외 필터를 보여줄지 결정
  const showStudyTypeFilter = shouldShowFilter(tab, isInstructor);
  // 현재 적용할 스터디/과외 타입 결정
  const currentStudyType = getCurrentStudyType(tab, studyType, isInstructor);

  return (
    <div className='flex flex-col'>
      {/* 항상 보이는 메인 탭 목록 */}
      <TabList
        currentTab={tab}
        onChange={handleTabChange}
        isInstructor={isInstructor}
      />

      {/* 스터디/과외 필터 (조건부 표시) */}
      {showStudyTypeFilter && (
        <StudyTypeFilter
          key={tab}
          value={currentStudyType}
          onChange={handleStudyTypeChange}
        />
      )}

      {/* 리뷰 필터 (내 리뷰 탭에서만 표시) */}
      {tab === "myReview" && (
        <ReviewTabs value={reviewTab} onChange={handleReviewTabChange} />
      )}

      {/* 데이터 목록 표시 */}
      <MeetingList
        tab={tab}
        studyType={currentStudyType}
        reviewTab={tab === "myReview" ? reviewTab : undefined}
        ownId={ownId}
        userId={userId}
      />
    </div>
  );
}
