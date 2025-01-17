import MeetDetail from "@/components/meet-detail/MeetDetail";

export default async function Meet({ params }: { params: { id: number } }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meetups/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("api에러");
      }

      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });

  return <MeetDetail meetInfo={res.data} />;
}
