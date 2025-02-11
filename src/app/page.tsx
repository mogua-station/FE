import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dynamicImport from "next/dynamic";
import { getMeetupList } from "@/lib/main/meetup.api";
import { type MeetupQueryType } from "@/types/meetup.type";
import { generateQueryKey } from "@/utils/meetup.queryKey";

const MainNavigation = dynamicImport(
  () => import("@/components/main/MainNavigation"),
);

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: MeetupQueryType;
}) {
  const queryClient = new QueryClient();

  let result;

  try {
    result = await getMeetupList({
      page: 0,
      limit: 10,
      orderBy: searchParams.orderBy,
      type: searchParams.type,
      state: searchParams.state,
      location: searchParams.location,
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
    });
  } catch (error) {
    console.error(error);
  }

  const queryKey = generateQueryKey(searchParams);
  queryClient.setQueryData(queryKey, {
    pages: [result],
    pageParams: [0],
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className='flex grow flex-col px-4 tablet:px-8 desktop:px-0'>
      <div className='z-10 mx-auto flex size-full max-w-[960px] grow flex-col gap-8 rounded-[2.5rem] pt-2 tablet:pt-[3.25rem] desktop:pb-2.5 desktop:pt-[4.5rem]'>
        <MainNavigation initialParams={searchParams} />

        <HydrationBoundary state={dehydratedState}>
          <MainContentList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
