import MeetDetail from "@/components/meet-detail/MeetDetail";
import { fetchMeetupData } from "@/lib/meetDetail/meetDetailApi";

export default async function Meet({ params }: { params: { id: number } }) {
  const { id } = params;

  const meetData = await fetchMeetupData(id);

  return <MeetDetail meetInfo={meetData.data} />;
}
