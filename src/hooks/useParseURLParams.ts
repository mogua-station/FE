import { useSearchParams } from "next/navigation";
import type {
  LocationType,
  MeetupType,
  OrderType,
  StateType,
} from "@/types/meetup.type";

// URL 파라미터를 파싱하는 커스텀 훅
const useParseURLParams = () => {
  const searchParams = useSearchParams();

  return {
    type: searchParams.get("type") as MeetupType,
    location: searchParams.get("location") as LocationType,
    state: searchParams.get("state") as StateType,
    startDate: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : null,
    endDate: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : null,
    order: searchParams.get("order") as OrderType,
  };
};

export default useParseURLParams;
