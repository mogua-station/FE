export default async function Meet({ params }: { params: { id: number } }) {
  const { id } = params;

  return <div>page{id}</div>;
}
