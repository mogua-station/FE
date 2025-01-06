"use client";

import React, { useState, useRef, useEffect } from "react";

interface Origin {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
}

type Position = {
  anchor: Origin;
  content: Origin;
};

type PopoverProps = {
  gapX?: number; // X축 간격
  gapY?: number; // Y축 간격
  position?: Position; // 위치 지정
  onOpen?: () => void; // 열림 콜백
  onClose?: () => void; // 닫힘 콜백
  content: React.ReactNode; // 팝오버 내용
  children: React.ReactNode; // 트리거 요소
};

export default function Popover({
  gapX = 0,
  gapY = 8,
  position = {
    anchor: { vertical: "bottom", horizontal: "center" },
    content: { vertical: "top", horizontal: "center" },
  },
  onOpen,
  onClose,
  content,
  children,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const togglePopover = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && onOpen) onOpen();
    if (!nextState && onClose) onClose();
  };

  const getPopoverStyle = () => {
    if (!triggerRef.current || !popoverRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    // 기본 anchorOrigin 처리
    switch (position.anchor.vertical) {
      case "top":
        top = 0;
        break;
      case "center":
        top = triggerRect.height * 0.5;
        break;
      case "bottom":
        top = triggerRect.height;
        break;
    }
    switch (position.anchor.horizontal) {
      case "left":
        left = 0;
        break;
      case "center":
        left = triggerRect.width * 0.5;
        break;
      case "right":
        left = triggerRect.width;
        break;
    }

    // 기본 overlayOrigin 처리
    switch (position.content.vertical) {
      case "top":
        top += gapY;
        break;
      case "center":
        top -= popoverRect.height * 0.5;
        break;
      case "bottom":
        top -= popoverRect.height + gapY;
        break;
    }
    switch (position.content.horizontal) {
      case "left":
        left += gapX;
        break;
      case "center":
        left -= popoverRect.width * 0.5;
        break;
      case "right":
        left -= popoverRect.width + gapX;
        break;
    }

    setStyle({
      top,
      left,
    });
  };

  useEffect(() => {
    getPopoverStyle();
  }, [isOpen]);

  return (
    <div className='relative inline-block'>
      <button
        onClick={togglePopover}
        className='focus:outline-none'
        ref={triggerRef}
      >
        {children}
      </button>
      {isOpen && (
        <div className='absolute z-50' ref={popoverRef} style={style}>
          {content}
        </div>
      )}
    </div>
  );
}
