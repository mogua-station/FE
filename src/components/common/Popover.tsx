"use client";

import React, { useState, useRef, useEffect } from "react";
import { type PopoverRenderFn, type PopoverProps } from "@/types/dropdown.type";

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

  const closePopover = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

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

    // anchor
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

    // content
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

    setStyle({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      getPopoverStyle();
    }
  }, [isOpen]);

  return (
    <div className='relative inline-block'>
      {/* 트리거 */}
      <button
        type='button'
        ref={triggerRef}
        onClick={togglePopover}
        className='focus:outline-none'
        aria-label='popover-trigger'
      >
        {children}
      </button>

      {/* 팝오버 */}
      {isOpen && (
        <div className='absolute z-50' ref={popoverRef} style={style}>
          {typeof content === "function"
            ? (content as PopoverRenderFn)(closePopover)
            : content}
        </div>
      )}
    </div>
  );
}
