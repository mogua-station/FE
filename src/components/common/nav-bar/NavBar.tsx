import NavMenuItem from "../NavMenuItem";
import HeartIcon from "@/assets/images/icons/heart.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import UserIcon from "@/assets/images/icons/user.svg";

const NAV_ITEMS = [
  { href: "/", icon: <PlanetIcon />, label: "모임 찾기" },
  { href: "/wishlist", icon: <HeartIcon />, label: "찜한 모임" },
  { href: "/mypage", icon: <UserIcon />, label: "마이 페이지" },
];

export default function NavBar() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 flex items-center justify-between bg-normal px-6 py-[9px] text-gray-500'>
      {NAV_ITEMS.map((item) => (
        <NavMenuItem key={item.label} {...item} />
      ))}
    </nav>
  );
}
