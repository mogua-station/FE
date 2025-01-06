"use client";

import React, { useState } from "react";
import Popover from "./Popover";

type Align = "LR" | "CC" | "RL" | "LL" | "RR";

type DropdownItem = {
  label: string; // 항목 텍스트
  value?: string; // 항목 값
  onClick?: () => void; // 항목별 클릭 핸들러
};

type DropdownProps = {
  align?: Align; // 드롭다운 정렬 방식
  content: DropdownItem[]; // 드롭다운 항목 배열
  gapX?: number; // X축 간격
  gapY?: number; // Y축 간격
  defaultSelected?: string; // 기본 선택 항목
  children: React.ReactNode; // 트리거 요소
};

type VerticalAlign = "bottom" | "top" | "center";
type HorizontalAlign = "left" | "right" | "center";

type Position = {
  anchor: { vertical: VerticalAlign; horizontal: HorizontalAlign };
  content: { vertical: VerticalAlign; horizontal: HorizontalAlign };
};

export default function Dropdown({
  align = "RR",
  content,
  gapX = 0,
  gapY = 8,
  defaultSelected,
  children,
}: DropdownProps) {
  const [selected, setSelected] = useState<string | null>(
    defaultSelected || null,
  );

  const handleSelect = (label: string, onClick?: () => void) => {
    setSelected(label);
    console.log(label);
    if (onClick) onClick();
  };

  const getPosition = (): Position => {
    switch (align) {
      case "LR":
        return {
          anchor: { vertical: "bottom", horizontal: "left" },
          content: { vertical: "top", horizontal: "right" },
        };
      case "CC":
        return {
          anchor: { vertical: "bottom", horizontal: "center" },
          content: { vertical: "top", horizontal: "center" },
        };
      case "RL":
        return {
          anchor: { vertical: "bottom", horizontal: "right" },
          content: { vertical: "top", horizontal: "left" },
        };
      case "LL":
        return {
          anchor: { vertical: "bottom", horizontal: "left" },
          content: { vertical: "top", horizontal: "left" },
        };
      case "RR":
        return {
          anchor: { vertical: "bottom", horizontal: "right" },
          content: { vertical: "top", horizontal: "right" },
        };
      default:
        return {
          anchor: { vertical: "bottom", horizontal: "center" },
          content: { vertical: "top", horizontal: "center" },
        };
    }
  };

  return (
    <Popover
      gapX={gapX}
      gapY={gapY}
      position={getPosition()}
      content={
        <ul className='min-w-[7.25rem] cursor-pointer rounded-xl border border-gray-800 bg-gray-900'>
          {content.map((item, index) => (
            <li
              key={index}
              className={`text-body-2-normal ${selected === item.label || selected === item.value ? "text-gray-200" : "text-gray-500"} mx-auto w-max px-[0.875rem] py-3 text-center font-semibold`}
              onClick={() =>
                handleSelect(item.value ?? item.label, item.onClick)
              }
            >
              {item.label}
            </li>
          ))}
        </ul>
      }
    >
      {children}
    </Popover>
  );
}
