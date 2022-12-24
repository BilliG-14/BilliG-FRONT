import { useRef, useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { HiArrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import './category.css';
import api from '../../api/customAxios';
import { useIsLoginStore } from 'store/LoginJoinStore';
import CategorySection from './CategorySection';
import { Item } from 'components/myinfo/MyGivePostList';

export default function Category() {
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
        className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto"
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
              <CategorySection
                key={category._id}
                idx={idx}
                category={category}
                sectionRef={sectionRef}
              />
            );
          },
        )}
        {/* {categories?.data.map(
          (category: { _id: string; name: string }, idx: number) => {
            return (
              <section
                key={category._id}
                ref={(el) => (sectionRef.current[idx] = el)}
                className={`${bg[idx]} max-w-screen-lg mt-4 p-9 m-auto`}
              >
                <div>
                  <header className="flex justify-between px-12">
                    <h2 className="text-white text-4xl font-extrabold">
                      {category.name}
                    </h2>
                    <a
                      href="#"
                      className="flex justify-center items-center text-white text-lg font-extrabold hover:scale-125 ease-out duration-300"
                    >
                      <span className="mr-1">더보기</span>
                      <span>
                        <HiArrowRight />
                      </span>
                    </a>
                  </header>
                  <div className="flex justify-center">
                    {itemList.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </section>
            );
          },
        )} */}
      </div>
    </div>
  );
}

const bg: string[] = [
  'bg-b-bg-sec0',
  'bg-b-bg-sec1',
  'bg-b-bg-sec2',
  'bg-b-bg-sec3',
  'bg-b-bg-sec4',
  'bg-b-bg-sec5',
];
