import { fetcher } from "./fetcher";
import { PAGE_SIZE } from "@/constants/pagination";

export const userContentApi = {
  getReceived: (userId: string, token: string, page: number) =>
    fetcher(
      `/user/${userId}/reviews/received?page=${page}&limit=${PAGE_SIZE}`,
      token,
      { auth: true },
    ),

  getWritten: (
    userId: string,
    type: string,
    status: string,
    token: string,
    page: number,
  ) =>
    fetcher(
      `/user/${userId}/reviews/${type}/${status}?page=${page}&limit=${PAGE_SIZE}`,
      token,
      { auth: true },
    ),

  getParticipating: (
    userId: string,
    type: string,
    token: string,
    page: number,
  ) =>
    fetcher(
      `/user/${userId}/meetups/participating/${type}?page=${page}&limit=${PAGE_SIZE}`,
      token,
      { auth: true },
    ),

  getCreated: (userId: string, type: string, token: string, page: number) =>
    fetcher(
      `/user/${userId}/meetups/created/${type}?page=${page}&limit=${PAGE_SIZE}`,
      token,
      { auth: true },
    ),
};
