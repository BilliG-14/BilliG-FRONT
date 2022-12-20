import CategoryNav from './CategoryNav';
import { useRef, useState } from 'react';
import CategorySection from './CategorySection';
import ItemCard from './ItemCard';
import { HiArrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ItemType = {
  id: number;
  img: string;
  title: string;
  category: string;
  address: string;
  deal: string;
  price: { time: string; day: string };
};

export default function Category() {
  const { isLoading, data: categories } = useQuery(
    ['categories'],
    async () => {
      console.log('fetching...');
      return axios.get(
        'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category',
      );
    },
    { refetchOnWindowFocus: false, staleTime: 60 * 1000 * 60 },
  );

  const sectionRef = useRef<HTMLElement[] | null[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // console.log(e);
    // sectionRef.current[idx];
  };

  const [itemList, setItemList] = useState<ItemType[]>([
    {
      id: 1,
      img: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      title: 'Apple 2022 맥북 프로 13 M2 대여해드려요',
      category: 'IT기기',
      address: '서울시 동대문구',
      deal: '직거래',
      price: { time: '5,000', day: '30,000' },
    },
    {
      id: 2,
      img: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      title: 'Apple 2022 맥북 프로 13 M2 대여해드려요',
      category: 'IT기기',
      address: '서울시 동대문구',
      deal: '택배',
      price: { time: '5,000', day: '30,000' },
    },
    {
      id: 3,
      img: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      title: 'Apple 2022 맥북 프로 13 M2 대여해드려요',
      category: 'IT기기',
      address: '서울시 동대문구',
      deal: '직거래',
      price: { time: '5,000', day: '30,000' },
    },
    {
      id: 4,
      img: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
      title: 'Apple 2022 맥북 프로 13 M2 대여해드려요',
      category: 'IT기기',
      address: '서울시 동대문구',
      deal: '택배',
      price: { time: '5,000', day: '30,000' },
    },
  ]);

  if (isLoading) return <p>Loading..</p>;
  console.log(sectionRef);
  console.log(sectionRef.current[0]);
  return (
    <div className="">
      <nav className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto">
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
                      console.log(sectionRef.current[idx]);
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
        )}
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
