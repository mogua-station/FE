import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type MeetupFormType } from "@/types/meetup.type";

export const useLocalStorageForm = (
  methods: UseFormReturn<MeetupFormType>,
  tempKey: string,
) => {
  // 초기값을 로컬스토리지에서 불러오기
  useEffect(() => {
    const loadStoredData = async () => {
      const storedData = localStorage.getItem(tempKey);
      if (!storedData) return;

      try {
        const parsedData = JSON.parse(storedData);

        if (
          parsedData.expiration &&
          new Date(parsedData.expiration) < new Date()
        ) {
          localStorage.removeItem(tempKey);
          return;
        }

        const recruitmentStartDate = parsedData.recruitmentStartDate
          ? new Date(parsedData.recruitmentStartDate)
          : null;
        const recruitmentEndDate = parsedData.recruitmentEndDate
          ? new Date(parsedData.recruitmentEndDate)
          : null;
        const meetingStartDate = parsedData.meetingStartDate
          ? new Date(parsedData.meetingStartDate)
          : null;
        const meetingEndDate = parsedData.meetingEndDate
          ? new Date(parsedData.meetingEndDate)
          : null;

        methods.reset({
          ...parsedData,
          recruitmentStartDate,
          recruitmentEndDate,
          meetingStartDate,
          meetingEndDate,
        });
      } catch (error) {
        console.error("Failed to load stored data:", error);
      }
    };

    loadStoredData();
  }, []);

  // 폼 데이터를 로컬스토리지에 저장하기
  useEffect(() => {
    const subscription = methods.watch((value) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);
      localStorage.setItem(
        tempKey,
        JSON.stringify({
          ...value,
          recruitmentStartDate: value.recruitmentStartDate?.toISOString(),
          recruitmentEndDate: value.recruitmentEndDate?.toISOString(),
          meetingStartDate: value.meetingStartDate?.toISOString(),
          meetingEndDate: value.meetingEndDate?.toISOString(),
          expiration: expirationDate.toISOString(),
        }),
      );
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, tempKey]);

  // 탭을 닫거나 새로고침할 때 로컬스토리지에서 임시 데이터 삭제
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (localStorage.getItem(tempKey)) {
        event.preventDefault();
      }
    };

    const handleUnload = () => {
      localStorage.removeItem(tempKey);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [tempKey]);
};
