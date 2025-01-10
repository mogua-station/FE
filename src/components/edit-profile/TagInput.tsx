"use client";

import { useState } from "react";
import CountIndicator from "../common/CountIndicator";
import Tag from "./Tag";
import DeleteIcon from "@/assets/images/icons/delete.svg";

export default function TagInput() {
  const [inputValue, setInputValue] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        const cleanedInputValue = inputValue.replace(/#/g, "");
        setTagList((prev) => [...prev, cleanedInputValue]);
        setInputValue("");
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

  const tagInputStyle = tagList.length === 0 ? "ml-2" : "";

  return (
    <>
      <div className='mt-8'>
        <div className='flex justify-between'>
          <label className='profile-edit-label mt-0'>태그</label>
          {/* 카운트 */}
          <CountIndicator currentCount={0} maxCount={3} />
        </div>
        {/* 폼 데이터 전송을 위한 hidden input */}
        <input
          type='hidden'
          name='userTagList'
          value={JSON.stringify(tagList)}
        />

        {/* 태그 목록 */}
        <ul className='flex flex-wrap items-center gap-2'>
          {tagList.map((tag, idx) => (
            <Tag key={tag} tag={tag}>
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
            name='userTag'
            placeholder='# 태그추가'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={tagList.length >= 3}
            maxLength={5}
          />
        </ul>

        {/* 태그 입력 필드 */}
      </div>
      <p className='profile-edit-message mt-0'>최대 5글자까지 입력 가능해요</p>
    </>
  );
}
