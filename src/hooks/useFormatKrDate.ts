export default function useFormatKrDate() {
  const format = (date: Date) => {
    //kr타입으로 날짜변경
    const formatDate = date.toLocaleDateString("ko-KR");

    return formatDate;
  };

  return format;
}
