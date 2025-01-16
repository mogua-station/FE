import NavMenuItem from "./NavMenuItem";
import { USER_ID } from "@/app/user/edit_profile/page";
import BookmarkFillIcon from "@/assets/images/icons/bookmark_fill.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import UserIcon from "@/assets/images/icons/user.svg";

const NAV_ITEMS = [
  { href: "/", icon: <PlanetIcon />, label: "모임 찾기" },
  { href: "/wishlist", icon: <BookmarkFillIcon />, label: "북마크" },
  { href: `/user/${USER_ID}`, icon: <UserIcon />, label: "마이 페이지" },
];

export default function NavBar() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 z-10 bg-normal px-6 py-[9px] tablet:px-20 desktop:hidden'>
      <ul className='flex w-full justify-between'>
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <NavMenuItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
