"use client";

import { useState, useEffect } from "react";
import MeetingList from "./MeetingList";
import ReviewTabs from "./ReviewTabs";
import StudyTypeFilter from "./StudyTypeFilter";
import TabList from "./TabList";
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
import {
  type UserTabsProps,
  type UserPageSection,
  type StudyType,
  type MyReviewTab,
} from "@/types/user-page";

export default function UserTabs({ isInstructor = false }: UserTabsProps) {
  const [currentTab, setCurrentTab] = useState<UserPageSection>("myMeeting");
  const [studyType, setStudyType] = useState<StudyType>("study");
  const [reviewTab, setReviewTab] = useState<MyReviewTab>("toWrite");

  // 필터 표시 여부 조건 수정
  const showStudyTypeFilter =
    currentTab === "myMeeting" || // 내 모임에서는 항상 보임
    (currentTab === "createdMeeting" && isInstructor) || // 만든 모임에서는 과외선생님일 때만 보임
    currentTab === "myReview"; // 내 리뷰에서는 항상 보임 (작성 가능한 리뷰/작성한 리뷰 모두)

  // 현재 선택된 스터디 타입 결정
  const currentStudyType =
    currentTab === "classReview"
      ? "tutoring" // 수강평은 항상 tutoring
      : !isInstructor && currentTab === "createdMeeting"
        ? "study" // 과외선생님이 아닐 때 만든 모임은 항상 study
        : studyType; // 그 외에는 선택된 필터 값 사용

  // 3. 탭 변경시 필터 초기화
  const handleTabChange = (tab: UserPageSection) => {
    setCurrentTab(tab);
    if (tab !== "classReview") {
      setStudyType("study");
    }
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
        onChange={handleTabChange}
        isInstructor={isInstructor}
      />
      <div
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

        {/* 각 탭별로 studyType에 맞는 목데이터 전달 */}
        {currentTab === "myMeeting" && (
          <MeetingList
            items={currentStudyType === "study" ? myStudyList : myTutoringList}
            variant='myMeeting'
          />
        )}
        {currentTab === "createdMeeting" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? createdStudyList
                : isInstructor
                  ? createdTutoringList
                  : [] // 과외 선생님이 아닐 경우 빈 배열
            }
            variant='createdMeeting'
          />
        )}
        {currentTab === "myReview" && reviewTab === "toWrite" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? reviewableStudyList
                : reviewableTutoringList
            }
            variant={{ type: "myReview", tab: reviewTab }}
          />
        )}
        {currentTab === "myReview" && reviewTab === "written" && (
          <MeetingList
            items={
              currentStudyType === "study"
                ? writtenReviews
                : writtenTutoringReviews
            }
            variant={{ type: "myReview", tab: reviewTab }}
          />
        )}
        {currentTab === "classReview" && isInstructor && (
          <MeetingList items={classReviews} variant='classReview' />
        )}
      </div>
    </>
  );
}
