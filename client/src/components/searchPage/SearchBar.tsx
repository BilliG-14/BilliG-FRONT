import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  return (
    <form action="submit" className="w-full flex justify-center mb-4">
      <input
        type="text"
        placeholder="검색어를 입력해주세요..."
        className="w-full text-xl max-w-3xl border-b border-solid border-b-yellow px-4 py-3 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute p-2 text-4xl right-32 text-b-yellow hover: ease-in-out duration-300"
      >
        <FiSearch />
      </button>
    </form>
  );
}

// const adminMenuList: { category: string; list: string[] } = [
//   { category: '회원관리', list: ['회원 목록 조회', '회원 상세 관리'] },
//   { category: '게시물 관리', list: ['게시물 조회'] },
//   { category: '대여 관리', list: ['대여 현황 조회'] },
// ];
