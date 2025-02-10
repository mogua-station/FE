import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import MeetDetail from "@/components/meet-detail/MeetDetail";
import usePrefetchMeetingReview from "@/hooks/usePrefetchMeetingReview";

import { fetchMeetupData } from "@/lib/meetDetail/meetDetailApi";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { id } = params;
  const meetData = await fetchMeetupData(id);

  return {
    title: `${meetData?.data.title} | mogua`,
    description: `${meetData?.data.title}의 정보를 확인해보세요`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Meet({ params }: { params: { id: number } }) {
  const queryClient = new QueryClient();
  const { id } = params;

  const meetData = await fetchMeetupData(id);

  if (meetData.data.meetupStatus === "COMPLETED") {
    await usePrefetchMeetingReview(id);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MeetDetail meetInfo={meetData.data} />
    </HydrationBoundary>
  );
}
