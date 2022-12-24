import React from 'react';
import ItemCard from './ItemCard';
import { HiArrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from 'components/myinfo/MyGivePostList';

type ItemListProps = {
  category: { _id: string; name: string };
  idx: number;
  sectionRef: React.ForwardedRef<HTMLElement[] | null[]>;
};

export default function CategorySection({
  category,
  idx,
  sectionRef,
}: ItemListProps) {
  const { isLoading, data: categoryItems } = useQuery(
    [`categoryItems/${category._id}`],
    async () => {
      return api.get(
        `/product/page?&postType=lend&per=4&page=1&category=${category._id}`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  if (isLoading) return <p>Loading...</p>;
  console.log(categoryItems);
  return (
    <section className={`${bg[idx]} max-w-screen-lg mt-4 p-9 m-auto`}>
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
          {categoryItems?.data.docs.map((item: Item) => (
            <ItemCard key={item._id} item={item} categoryName={category.name} />
          ))}
        </div>
      </div>
    </section>
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
