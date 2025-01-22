import { type MeetupQueryType } from "@/types/meetup.type";

export function generateQueryKey(params: MeetupQueryType): string[] {
  const queryKey = ["meetup"];
  if (params.orderBy) queryKey.push(params.orderBy);
  if (params.type) queryKey.push(params.type);
  if (params.state) queryKey.push(params.state);
  if (params.location) queryKey.push(params.location);
  if (params.startDate) queryKey.push(params.startDate);
  if (params.endDate) queryKey.push(params.endDate);
  return queryKey;
}
