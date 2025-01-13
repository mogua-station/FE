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

export default function UserTabs({ isInstructor = false }: UserTabsProps) {
  const [currentTab, setCurrentTab] = useState<UserPageSection>("myMeeting");
  const [studyType, setStudyType] = useState<StudyType>("study");
  const [reviewTab, setReviewTab] = useState<MyReviewTab>("toWrite");

  const handleTabChange = (tab: UserPageSection) => {
    setCurrentTab(tab);
    // 탭 변경 시 필터 초기화
    if (tab === "classReview") {
      setStudyType("tutoring");
    } else {
      setStudyType("study");
    }
  };

  const showStudyTypeFilter = shouldShowFilter(currentTab, isInstructor);
  const currentStudyType = getCurrentStudyType(
    currentTab,
    studyType,
    isInstructor,
  );

  return (
    <div className='flex flex-col gap-4'>
      <TabList
        currentTab={currentTab}
        onChange={handleTabChange}
        isInstructor={isInstructor}
      />

      {showStudyTypeFilter && (
        <StudyTypeFilter
          key={currentTab}
          value={currentStudyType}
          onChange={setStudyType}
        />
      )}

      {currentTab === "myReview" && (
        <ReviewTabs value={reviewTab} onChange={setReviewTab} />
      )}

      <MeetingList
        tab={currentTab}
        studyType={currentStudyType}
        reviewTab={currentTab === "myReview" ? reviewTab : undefined}
        variant={
          currentTab === "myReview"
            ? { type: "myReview", tab: reviewTab }
            : currentTab
        }
      />
    </div>
  );
}
