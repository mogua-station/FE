import PlusIcon from "@/assets/images/icons/plus-thin.svg";
import SearchIcon from "@/assets/images/icons/search-thin.svg";

export default function Header() {
  return (
    <header className='flex items-center justify-end bg-black px-5 py-2.5'>
      <div className='flex w-full justify-between'>
        {/* 검색 컴포넌트가 들어갈 자리? */}
        <div></div>

        <div className='flex gap-6'>
          <button>
            <SearchIcon className='text-gray-200' />
          </button>
          <button>
            <PlusIcon className='text-gray-200' />
          </button>
        </div>
      </div>
    </header>
  );
}
