"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import { type MeetProps } from "@/types/meetDetail";

const fetchMeetup = async ({ pageParms = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meetups/list`);

  if (!res.ok) {
    return new Error("API에러 발생");
  }

  const data = await res.json();

  const meetupList = data.data;

  const wishlist = localStorage.getItem("wishlist");
  const arr = wishlist ? JSON.parse(wishlist as string) : [];

  const filteredList = meetupList.filter((item: any) =>
    arr.includes(item.meetupId),
  );

  const startIndex = (pageParms - 1) * 4;
  const endIndex = startIndex + 4;

  return {
    data: filteredList.slice(startIndex, endIndex),
    page: pageParms,
  };
};

export default function WishlistClient() {
  const { data: meetupList } = useInfiniteQuery({
    queryKey: ["meetUp"],
    queryFn: ({ pageParam }) => fetchMeetup({ pageParms: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastpage) => {
      console.log(lastpage);
      return undefined;
      // lastpage.data && lastpage.data.length > 0 ? lastpage.page + 1 : undefined;
    },
  });

  useEffect(() => {
    console.log(meetupList);
  }, [meetupList]);

  return <div></div>;
}
