import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamicImport from "next/dynamic";
import BackgroundAlien from "@/components/main/BackgroundAlien";
import { getMeetupList } from "@/lib/main/meetup.api";
import { type MeetupQueryType } from "@/types/meetup.type";
import { generateQueryKey } from "@/utils/meetup.queryKey";

const MainContentList = dynamicImport(
  () => import("@/components/main/MainContentList"),
);
const MainNavigation = dynamicImport(
  () => import("@/components/main/MainNavigation"),
);

export const dynamic = "force-dynamic"; // 동적 렌더링 강제

export default async function Home({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
  const queryClient = new QueryClient();

  try {
    const queryKey = generateQueryKey(searchParams);

    await queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 0 }) =>
        getMeetupList({
          page: pageParam,
          limit: 10,
          orderBy: searchParams.orderBy,
          type: searchParams.type,
          state: searchParams.state,
          location: searchParams.location,
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
        }),
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
    <div className='flex grow flex-col px-4 tablet:px-8 desktop:px-0'>
      <div className='z-10 mx-auto flex size-full max-w-[1200px] grow flex-col gap-8 rounded-[2.5rem] pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
        <MainNavigation initialParams={searchParams} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <MainContentList />
        </HydrationBoundary>
      </div>

      <BackgroundAlien />
    </div>
  );
}
