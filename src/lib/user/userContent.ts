import { get } from "./fetcher";
import { PAGE_SIZE } from "@/constants/pagination";

export const userContentApi = {
  getReceived: (userId: string, page: number) =>
    get(`/user/${userId}/reviews/received?page=${page}&limit=${PAGE_SIZE}`),

  getWritten: (userId: string, type: string, status: string, page: number) =>
    get(
      `/user/${userId}/reviews/${type}/${status}?page=${page}&limit=${PAGE_SIZE}`,
    ),

  getParticipating: (userId: string, type: string, page: number) =>
    get(
      `/user/${userId}/meetups/participating/${type}?page=${page}&limit=${PAGE_SIZE}`,
    ),

  getCreated: (userId: string, type: string, page: number) =>
    get(
      `/user/${userId}/meetups/created/${type}?page=${page}&limit=${PAGE_SIZE}`,
    ),
};
