"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useIndexedDB } from "./useIndexedDB";

export default function ClearImageOnPageLeave() {
  const pathname = usePathname();
  const { deleteImage } = useIndexedDB();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;

    if (prevPathname !== pathname) {
      deleteImage();
    }

    prevPathnameRef.current = pathname;
  }, [pathname, deleteImage]);

  return null;
}
