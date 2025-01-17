"use client";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CountIndicator from "../common/CountIndicator";
import Tag from "./Tag";
import DeleteIcon from "@/assets/images/icons/delete.svg";

interface TagInputProps {
  defaultTags?: Array<{ id: number; tag: string }>;
  onTagsChange: (tags: string[]) => void;
  name: string;
}

export default function TagInput({
  defaultTags = [],
  onTagsChange,
  name,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>(
    defaultTags.map((item) => item.tag),
  );
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const tagInputStyle = tagList.length === 0 ? "ml-2" : "";
  const hintMessageStyle = errors[name] ? "text-danger" : "text-gray-500";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() && inputValue.length <= 5) {
        const cleanedInputValue = inputValue.replace(/#/g, "");
        setTagList((prev) => [...prev, cleanedInputValue]);
        setInputValue("");
        clearErrors(name);
      }
      return;
    }

    if (e.key === "Backspace" && !inputValue) {
      e.preventDefault();
      if (tagList.length > 0) {
        setTagList((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleDeleteTag = (indexToDelete: number) => {
    setTagList((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  useEffect(() => {
    onTagsChange(tagList);
  }, [tagList]);

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

          <ul className='flex flex-nowrap items-center gap-2'>
            {tagList.map((tag, idx) => (
              <Tag key={`tag-${tag}`} tag={tag}>
                <button
                  type='button'
                  aria-label='삭제'
                  onClick={() => handleDeleteTag(idx)}
                >
                  <DeleteIcon className='ml-px size-4' />
                </button>
              </Tag>
            ))}
            <input
              className={`my-5 bg-transparent align-middle text-body-2-normal font-medium text-gray-100 outline-none placeholder:text-body-2-reading placeholder:font-regular placeholder:text-gray-400 disabled:hidden disabled:cursor-not-allowed ${tagInputStyle}`}
              type='text'
              {...field}
              placeholder='# 태그추가'
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                field.onChange(e);
              }}
              onKeyDown={handleKeyDown}
              disabled={tagList.length >= 3}
              maxLength={5}
            />
          </ul>

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
