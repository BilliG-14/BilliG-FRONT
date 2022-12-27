import { useRef, useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import './category.css';
import api from '../../api/customAxios';
import CategorySectionLend from './CategorySectionLend';

export default function LendCategory() {
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

  const { isLoading, data: categories } = useQuery(
    ['categories'],
    async () => {
      console.log('fetching...');
      return api.get('/category');
    },
    { refetchOnWindowFocus: false, staleTime: 60 * 1000 * 60 },
  );

  if (isLoading) return <p>Loading..</p>;
  return (
    <div className="relative">
      <nav
        className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto z-50"
        ref={navRef}
      >
        <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
          {/* category nav */}
          {categories?.data.map(
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
      <div>
        {/* category section */}
        {categories?.data.map(
          (category: { _id: string; name: string }, idx: number) => {
            return (
              <CategorySectionLend
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
