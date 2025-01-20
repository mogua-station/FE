import MeetDetail from "@/components/meet-detail/MeetDetail";

export default async function Meet({ params }: { params: { id: number } }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meetups/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`,
    },
    cache: "no-store", //매 요청마다 새로운 데이터를 가져온다.
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

  console.log(res);

  return <MeetDetail meetInfo={res.data} />;
}
