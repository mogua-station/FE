"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import { type MeetProps } from "@/types/meetDetail";
// import Card from "@/components/common/card/Card";
// import { type CardProps } from "@/type/";

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
  // const [wishlistArr, setWishlistArr] = useState<any[]>([]);

  const { data: meetupList } = useInfiniteQuery({
    queryKey: ["meetUp"],
    queryFn: ({ pageParam }) => fetchMeetup({ pageParms: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastpage) => {
      console.log(lastpage);
      return undefined;
      // return lastpage.data && lastpage.data.length > 0
      //   ? lastpage.page + 1
      //   : undefined;
    },
  });

  useEffect(() => {
    // const flattenedData = meetupList?.pages.flatMap((page) => page.data) || [];
    // setWishlistArr(
    //   meetupList?.pages.flatMap((item) => (item as any).data) || [],
    // );
  }, [meetupList]);

  return (
    <section className='relative grid w-full grow grid-cols-1 gap-y-6 desktop:grid-cols-2 desktop:gap-x-8 desktop:gap-y-10'>
      {/* {wishlistArr?.map((item) => {
        return (
          <div></div>
          // <Card
          //   card={{
          //     title: item.title,
          //     location: item.location,
          //     participants: item.participants,
          //     recruitmentPeriod: {
          //       startDate: item.recruitmentStartDate,
          //       endDate: item.recruitmentStartDate,
          //     },
          //     eventPeriod: {
          //       startDate: item.meetingStartDate,
          //       endDate: item.meetingEndDate,
          //     },
          //     image: item.thumbnail,
          //   }}
          // />
        );
      })} */}
    </section>
  );
}
