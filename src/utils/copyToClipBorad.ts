export const copyToClipBoard = (url: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = url;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  alert("클립보드에 복사되었습니다.");
};
