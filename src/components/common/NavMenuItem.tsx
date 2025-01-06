import Link from "next/link";

interface NavMenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function NavMenuItem({ icon, label, href }: NavMenuItemProps) {
  return (
    <Link
      className='flex h-full min-w-[106px] flex-col items-center justify-center gap-[2px]'
      href={href}
    >
      <div className='size-6 p-[2px]'>{icon}</div>
      <span className='text-caption-normal font-semibold'>{label}</span>
    </Link>
  );
}
