"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CountIndicator from "../common/CountIndicator";
import TagInput from "./TagInput";
import TagList from "./TagList";
import { useTagList } from "@/hooks/user/useTagList";

interface TagInputFieldProps {
  defaultTags?: Array<{ id: number; tag: string }>;
  onTagsChange: (tags: string[]) => void;
  name: string;
}

export default function TagInputField({
  defaultTags = [],
  onTagsChange,
  name,
}: TagInputFieldProps) {
  const [inputValue, setInputValue] = useState("");
  const { tagList, addTag, deleteTag, deleteLastTag, isMaxTags } = useTagList({
    defaultTags,
    onTagsChange,
  });

  const {
    control,
    formState: { errors },
    clearErrors,
    setError,
  } = useFormContext();

  const tagInputStyle = tagList.length === 0 ? "ml-2" : "";
  const hintMessageStyle = errors[name] ? "text-danger" : "text-gray-500";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.length > 5) {
        setError(name, { message: "태그는 5글자를 넘어갈 수 없습니다." });
        return;
      }
      if (addTag(inputValue)) {
        setInputValue("");
        clearErrors(name);
      }
      return;
    }

    if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      deleteLastTag();
    }
  };

  const handleInputChange = (value: string, field: any) => {
    if (value.length > 5) {
      setError(name, { message: "태그는 5글자를 넘어갈 수 없습니다." });
    } else {
      clearErrors(name);
    }
    setInputValue(value);
    field.onChange(value);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        maxLength: {
          value: 5,
          message: "태그는 5글자를 넘어갈 수 없습니다.",
        },
      }}
      render={({ field }) => (
        <div>
          <div className='flex justify-between'>
            <label className='ml-2 select-none text-body-2-normal font-medium text-gray-300'>
              태그
            </label>
            <CountIndicator currentCount={tagList.length} maxCount={3} />
          </div>
          <input
            type='hidden'
            name='userTagList'
            value={JSON.stringify(tagList)}
          />
          <div className='flex flex-nowrap items-center gap-2'>
            <TagList tags={tagList} onDelete={deleteTag} />
            <TagInput
              value={inputValue}
              onChange={(value) => handleInputChange(value, field)}
              onKeyDown={handleKeyDown}
              disabled={isMaxTags}
              className={tagInputStyle}
            />
          </div>
          <p
            className={`ml-2 text-label-normal font-medium ${hintMessageStyle}`}
          >
            {(errors[name]?.message as string) ||
              "최대 5글자까지 입력 가능해요"}
          </p>
        </div>
      )}
    />
  );
}
