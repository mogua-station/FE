import NavMenuItem from "./NavMenuItem";
import HeartIcon from "@/assets/images/icons/heart.svg";
import PlanetIcon from "@/assets/images/icons/planet.svg";
import UserIcon from "@/assets/images/icons/user.svg";

// 임시 로그인유저 아이디
const userId = 1;

const NAV_ITEMS = [
  { href: "/", icon: <PlanetIcon />, label: "모임 찾기" },
  { href: "/wishlist", icon: <HeartIcon />, label: "찜한 모임" },
  { href: `/users/${userId}`, icon: <UserIcon />, label: "마이 페이지" },
];

export default function NavBar() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 z-10 bg-normal px-6 py-[9px]'>
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
