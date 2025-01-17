import MeetDetail from "@/components/meet-detail/MeetDetail";
import { meetDetailMock } from "@/data/mockList";
import { type MeetProps } from "@/types/meetDetail";

export default async function Meet({ params }: { params: { id: number } }) {
  const { id } = params;

  const meetInfo: MeetProps = meetDetailMock.filter(
    (item) => item.id === Number(id),
  )[0];

  return <MeetDetail meetInfo={meetInfo} />;
}
