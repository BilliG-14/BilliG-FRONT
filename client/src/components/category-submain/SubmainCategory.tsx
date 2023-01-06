import { useRef, useState, useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from 'api/category-api';
import './category.css';
import CategorySection from './CategorySection';
import Loading from '../Loading';

export default function SubmainCategory({ type }: { type: string }) {
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

  const { isError, data: categories } = useQuery(
    ['categories'],
    getCategories,
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
      suspense: true,
    },
  );

  return (
    <div className="relative">
      <nav
        className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto z-50"
        ref={navRef}
      >
        <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
          {/* category nav */}
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </ul>
      </nav>
      <div className="w-screen max-w-screen-lg m-auto">
        <div className="text-3xl font-bold py-2 px-2 my-1">
          {type === 'borrow' ? (
            <span className="text-red-600">
              물건이 필요한 회원을 찾아보세요
            </span>
          ) : (
            <span className="text-blue-600">필요한 물건을 찾아보세요</span>
          )}
        </div>
        {/* category section */}
        <Suspense fallback={<Loading />}>
          {categories.map(
            (category: { _id: string; name: string }, idx: number) => {
              return (
                <CategorySection
                  key={category._id}
                  type={type}
                  idx={idx}
                  category={category}
                  sectionRef={(el) => (sectionRef.current[idx] = el)}
                />
              );
            },
          )}
        </Suspense>
      </div>
    </div>
  );
}
