"use client";

import { useState, useEffect } from "react";
import MeetingList from "./MeetingList";
import ReviewTabs from "./ReviewTabs";
import StudyTypeFilter from "./StudyTypeFilter";
import TabList from "./TabList";
import {
  type UserTabsProps,
  type UserPageSection,
  type StudyType,
  type MyReviewTab,
} from "@/types/user-page";

// const FAKE_MEEETINGS = Array.from({ length: 10 });
// const FAKE_MEEETINGS = [];

export default function UserTabs({ isInstructor = false }: UserTabsProps) {
  const [currentTab, setCurrentTab] = useState<UserPageSection>("myMeeting");
  const [studyType, setStudyType] = useState<StudyType>("study");
  const [reviewTab, setReviewTab] = useState<MyReviewTab>("toWrite");

  // 1. classReview는 무조건 tutoring
  const showStudyTypeFilter = currentTab !== "classReview";
  const currentStudyType =
    currentTab === "classReview" ? "tutoring" : studyType;

  // 2. reviewTab은 myReview에서만 사용
  const variant =
    currentTab === "myReview"
      ? { type: "myReview" as const, tab: reviewTab }
      : currentTab;

  // 3. 탭 변경시 필터 초기화
  const handleTabChange = (tab: UserPageSection) => {
    setCurrentTab(tab);
    // classReview가 아닌 경우 study로 초기화
    if (tab !== "classReview") {
      setStudyType("study");
    }
    // myReview 탭이 아닐 때는 reviewTab 초기화
    if (tab !== "myReview") {
      setReviewTab("toWrite");
    }
  };

  useEffect(() => {
    console.log("Current State:", {
      tab: currentTab,
      studyType: currentStudyType,
      reviewTab: currentTab === "myReview" ? reviewTab : undefined,
      showFilter: showStudyTypeFilter,
      setReviewTab,
    });
  }, [currentTab, studyType, reviewTab, showStudyTypeFilter, setReviewTab]);

  return (
    <>
      <TabList
        currentTab={currentTab}
        onChange={handleTabChange} // 탭 변경 핸들러 교체
        isInstructor={isInstructor}
      />
      <div
        className='mt-[23.5px] desktop:mt-8'
        role='tabpanel'
        id={`${currentTab}-panel`}
        aria-labelledby={`${currentTab}-tab`}
      >
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

        {/* 데이터 목록 */}
        <MeetingList items={[]} variant={variant} />
      </div>
    </>
  );
}
