import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import './category.css';
import api from '../../api/customAxios';
import CategorySectionBorrow from './CategorySectionBorrow';
import Loading from '../Loading';

export default function BorrowCategory() {
  const [scrollEvent, setScrollEvent] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement[] | null[]>([]);

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setScrollEvent(true);
      navRef.current?.classList.add('nav');
      navRef.current?.classList.remove('border-b-2');
    } else {
      setScrollEvent(false);
      navRef.current?.classList.add('border-b-2');
      navRef.current?.classList.remove('nav');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery(
    ['categories'],
    async () => {
      const result = await api.get('/category');
      return result.data;
    },
    { refetchOnWindowFocus: false, staleTime: 60 * 1000 * 60 },
  );

  if (isLoading) return <Loading />;
  console.log(categories);
  return (
    <div className="relative">
      <nav
        className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto z-50"
        ref={navRef}
      >
        <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
          {/* category nav */}
          {categories.map(
            (category: { _id: string; name: string }, idx: number) => {
              return (
                <li
                  key={category._id}
                  className="hover:text-b-yellow hover:scale-125 ease-out duration-300"
                >
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      sectionRef.current[idx]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }}
                  >
                    {category.name}
                  </p>
                </li>
              );
            },
          )}
        </ul>
      </nav>
      <div className="w-screen max-w-screen-lg m-auto">
        <div className="text-3xl font-bold py-2 px-2 my-1">
          <span>카테고리별 상품 | </span>
          <span className="text-red-600">빌리기</span>
        </div>
        {/* category section */}
        {categories.map(
          (category: { _id: string; name: string }, idx: number) => {
            return (
              <CategorySectionBorrow
                key={category._id}
                idx={idx}
                category={category}
                sectionRef={(el) => (sectionRef.current[idx] = el)}
              />
            );
          },
        )}
      </div>
    </div>
  );
}
