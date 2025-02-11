"use client";

import { usePathname } from "next/navigation";
import BackgroundAlien from "@/components/main/BackgroundAlien";

const HIDE_BACKGROUND_PATHS = ["/create", "/user/edit_profile"];
const SHOW_ALIEN_PATHS = ["/", "/wishlist"];

export default function BackgroundWrapper() {
  const pathname = usePathname();

  const isHideBackground = HIDE_BACKGROUND_PATHS.some(
    (path) => pathname === path,
  );
  const isShowAlien = SHOW_ALIEN_PATHS.some((path) => pathname === path);

  if (isHideBackground) return null;

  return (
    <>
      <video
        className='fixed inset-0 -z-10 size-full object-cover'
        src='/videos/background.mp4'
        loop
        autoPlay
        muted
        preload='auto'
        playsInline
      />

      {isShowAlien && <BackgroundAlien />}
    </>
  );
}
