"use client";

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
  tab: "myMeeting" as UserPageSection,
  studyType: "study" as StudyType,
  reviewTab: "toWrite" as MyReviewTab,
};

export default function UserTabs({ isInstructor = false }: UserTabsProps) {
  // 상태 통합 관리
  const [filters, setFilters] = useState(INITIAL_STATE);
  const { tab, studyType, reviewTab } = filters;

  // 핸들러 함수 단순화
  const handleTabChange = (newTab: UserPageSection) => {
    setFilters((prev) => ({
      ...prev,
      tab: newTab,
      studyType: newTab === "classReview" ? "tutoring" : "study",
      reviewTab: "toWrite",
    }));
  };

  const handleStudyTypeChange = (newStudyType: StudyType) => {
    setFilters((prev) => ({
      ...prev,
      studyType: newStudyType,
    }));
  };

  const handleReviewTabChange = (newReviewTab: MyReviewTab) => {
    setFilters((prev) => ({
      ...prev,
      reviewTab: newReviewTab,
    }));
  };

  const showStudyTypeFilter = shouldShowFilter(tab, isInstructor);
  const currentStudyType = getCurrentStudyType(tab, studyType, isInstructor);

  return (
    <div className='flex flex-col gap-4'>
      <TabList
        currentTab={tab}
        onChange={handleTabChange}
        isInstructor={isInstructor}
      />

      {showStudyTypeFilter && (
        <StudyTypeFilter
          key={tab}
          value={currentStudyType}
          onChange={handleStudyTypeChange}
        />
      )}

      {tab === "myReview" && (
        <ReviewTabs value={reviewTab} onChange={handleReviewTabChange} />
      )}

      <MeetingList
        tab={tab}
        studyType={currentStudyType}
        reviewTab={tab === "myReview" ? reviewTab : undefined}
      />
    </div>
  );
}
