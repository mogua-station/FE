import React from "react";
import { useController, type Control } from "react-hook-form";
import { type SelectBoxProps } from "@/types";

interface CommonSelectBoxProps
  extends Omit<SelectBoxProps, "value" | "onChange"> {
  control: Control<any>;
  rules?: Record<string, any>;
  layout: "1col" | "2cols"; // 레이아웃 옵션
  secondName?: string; // 두 번째 SelectBox 이름 (필요한 경우)
  secondPlaceholder?: string;
  secondOptions?: SelectBoxProps["options"];
  secondRules?: Record<string, any>;
}

const CommonSelectBox: React.FC<CommonSelectBoxProps> = ({
  name = "Select Box",
  secondName = "",
  label = "Select Box",
  layout = "1col",
  placeholder = "Select ...",
  secondPlaceholder = "Select ...",
  options = [],
  secondOptions = [],
  control,
  rules,
  secondRules,
  ...props
}) => {
  // 첫 번째 SelectBox 컨트롤
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  // 두 번째 SelectBox 컨트롤 (두 번째 SelectBox가 있을 경우)
  const {
    field: { onChange: secondOnChange, value: secondValue },
    fieldState: { error: secondError },
  } = useController({
    name: secondName || `${name}_second`, // 기본값을 name_second로 설정
    control,
    rules: secondRules,
  });

  const renderSelect = (
    selectBoxName: string,
    options: SelectBoxProps["options"],
    placeholder: string,
    selectedValue: string | undefined,
    onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>,
    error: any,
  ) => (
    <select
      name={selectBoxName}
      className={`relative flex w-full items-center rounded-[12px] border-2 bg-gray-950 px-[16px] py-[18px] text-body-2-normal font-medium focus:outline-none ${
        error
          ? "border-danger"
          : selectedValue === ""
            ? "border-gray-800"
            : "border-gray-500"
      } ${selectedValue !== "" && !error ? "border-primary" : ""} ${selectedValue === "" ? "text-gray-400" : "text-gray-200"}`}
      value={selectedValue || ""}
      onChange={onChangeHandler}
      aria-required={props.required}
      {...props}
    >
      {placeholder && (
        <option value='' disabled>
          {placeholder}
        </option>
      )}
      {options.length > 0 ? (
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option disabled>No options available</option>
      )}
    </select>
  );

  return (
    <div className='flex w-full flex-col gap-[12px]'>
      {label && (
        <label className='ml-2 select-none text-body-2-normal font-medium text-gray-300'>
          {label}
          {props.required && <span className='ml-1 text-danger'>*</span>}
        </label>
      )}
      <div
        className={`grid min-h-[54px] w-full gap-4 ${layout === "2cols" ? "grid-cols-2" : "grid-cols-1"}`}
      >
        {layout === "2cols" ? (
          <>
            {renderSelect(name, options, placeholder, value, onChange, error)}
            {secondOptions.length > 0 &&
              renderSelect(
                secondName || `${name}_second`,
                secondOptions,
                secondPlaceholder,
                secondValue,
                secondOnChange,
                secondError,
              )}
          </>
        ) : (
          renderSelect(name, options, placeholder, value, onChange, error)
        )}
      </div>
      {(error || secondError) && (
        <p className='text-label-normal font-medium text-danger'>
          {error?.message || secondError?.message}
        </p>
      )}
    </div>
  );
};

export default CommonSelectBox;
