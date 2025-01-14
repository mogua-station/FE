export const textInputContainerStyle = (
  error: string | undefined, // hasError로 변경 고민 중
  value: string | undefined,
  isValid: boolean | undefined,
) =>
  `py-[18px] px-[16px] relative flex items-center bg-gray-950 border-2 rounded-[12px] focus:outline-none h-[54px] w-full ${
    error
      ? "border-danger"
      : value === ""
        ? "border-gray-800"
        : isValid
          ? "border-primary"
          : "border-gray-800"
  }`;

export const selectInputContainerStyle = (
  error: string | undefined, // hasError로 변경 고민 중
  value: string | undefined,
) =>
  `w-full rounded-[12px] border bg-transparent px-4 py-2 text-body-2-normal font-medium focus:outline-none ${
    error ? "border-danger" : value ? "border-primary" : "border-gray-800"
  }`;

export const invisibleInputStyle = `w-full h-[20]px bg-gray-950 focus:outline-none text-body-2-normal font-medium text-gray-200`;

export const hintStyle = (
  error: string | undefined,
  isValid: boolean | undefined,
  name: string | undefined,
) => {
  if (name === "confirmPassword" || name === "email") {
    return error ? "text-danger" : isValid ? "text-primary" : "text-gray-500";
  }
  return error ? "text-danger" : "text-gray-500";
};
