import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MainContentList from "@/components/main/MainContentList";
import { mockCardData } from "@/data/mockCardData";
import { type CardProps } from "@/types/card";

export default async function Home({
  searchParams,
}: {
  searchParams: { meetup: string };
}) {
  const queryClient = new QueryClient();

  if (!searchParams.meetup) {
    searchParams = { ...searchParams, meetup: "study" };
  }

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["meetup"],
      queryFn: ({ pageParam = 0 }) =>
        fetchMockData(`/api/meetup?offset=${pageParam}`),
      getNextPageParam: (lastPage: {
        isLast: boolean;
        nextPage: number | null;
      }) => (!lastPage.isLast ? lastPage.nextPage : undefined),
      initialPageParam: 0,
    });
  } catch (error) {
    console.error("Error prefetching data:", error);
  }

  return (
    <div className='relative flex grow flex-col'>
      <video
        className='absolute inset-0 h-full w-full object-cover'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />

      <div className='z-10 mx-auto flex size-full max-w-[1200px] flex-col items-center justify-center gap-8 rounded-[2.5rem] px-4 pt-2 tablet:pt-[3.25rem] desktop:mb-2.5 desktop:mt-8 desktop:bg-gray-950-48 desktop:px-[3.25rem] desktop:py-10'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContentList />
        </HydrationBoundary>
      </div>
    </div>
  );
}

// 목 데이터를 fetch를 통해 반환하는 가상 API
async function fetchMockData(url: string): Promise<{
  data: CardProps[];
  nextPage: number | null;
  isLast: boolean;
}> {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const offset = Number(urlParams.get("offset")) || 0;
  const ITEMS_PER_PAGE = 10;

  const start = offset * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const slicedData = mockCardData.slice(start, end);
  const isLast = end >= mockCardData.length;

  console.log("server");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: slicedData,
        nextPage: isLast ? null : offset + 1,
        isLast,
      });
    }, 500); // 500ms 딜레이를 가정
  });
}
