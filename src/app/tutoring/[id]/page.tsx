import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import Head from "next/head";
import MeetDetail from "@/components/meet-detail/MeetDetail";
import usePrefetchMeetingReview from "@/hooks/usePrefetchMeetingReview";

import { fetchMeetupData } from "@/lib/meetDetail/meetDetailApi";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { id } = params;

  return {
    title: `모임 상세 | mogua`,
    description: `모임의 정보를 확인해보세요`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: `모임 상세 | mogua`,
      description: `모임의 정보를 확인해보세요`,
      url: `https://mogua.vercel.app/tutoring/${id}`,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title: `모임 상세 | mogua`,
      description: `모임의 정보를 확인해보세요`,
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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: meetData.data.title,
    startDate: meetData.data.startDate,
    endDate: meetData.data.endDate,
    location: {
      "@type": "Place",
      name: meetData.data.location,
    },
    organizer: {
      "@type": "Organization",
      name: "Mogua",
      url: "https://mogua.vercel.app",
    },
    description: meetData.data.content,
    eventStatus: "https://schema.org/EventScheduled",
    url: `https://mogua.vercel.app/tutoring/${id}`,
  };

  return (
    <>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <HydrationBoundary state={dehydratedState}>
        <MeetDetail meetInfo={meetData.data} />
      </HydrationBoundary>
    </>
  );
}
