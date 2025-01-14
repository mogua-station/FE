import { useState } from "react";

export function useSelectedDateRange() {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  return { selectedDates, setSelectedDates };
}
