"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function NavMenuItem({ icon, label, href }: NavMenuItemProps) {
  const pathname = usePathname();

  const active = pathname === href;
  const activeStyle = active ? "text-gray-200" : "text-gray-500";

  return (
    <Link
      className={`flex h-full min-w-[106px] flex-col items-center justify-center gap-[2px] ${activeStyle}`}
      href={href}
    >
      <div className='size-6 p-[2px]'>{icon}</div>
      <span className='text-caption-normal font-semibold'>{label}</span>
    </Link>
  );
}
