import React from 'react';
import SubmainLendItemCard from './SubmainLendItemCard';
import { HiArrowRight } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
import { Item } from 'components/myinfo/MyLendPostList';
import { useNavigate } from 'react-router-dom';

type ItemListProps = {
  category: { _id: string; name: string };
  idx: number;
  sectionRef: React.ForwardedRef<HTMLElement | null>;
};

export default function CategorySectionLend({
  category,
  idx,
  sectionRef,
}: ItemListProps) {
  const navigate = useNavigate();
  const { isLoading, data: categoryLendItems } = useQuery(
    [`categoryLendItems/${category._id}`],
    async () => {
      return api.get(
        `/product/page?&postType=lend&per=4&page=1&category=${category._id}`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <section
      className={`${bg[idx]} max-w-screen-lg mt-4 p-9 m-auto`}
      ref={sectionRef}
    >
      <div>
        <header className="flex justify-between px-6">
          <h2 className="text-white text-4xl font-extrabold">
            {category.name}
          </h2>
          <button
            className="flex justify-center items-center text-white text-lg font-extrabold hover:scale-125 ease-out duration-300"
            onClick={() => {
              navigate(`/products/lend/${category._id}`);
            }}
          >
            <span className="mr-1">더보기</span>
            <span>
              <HiArrowRight />
            </span>
          </button>
        </header>
        <div className="flex justify-center">
          {categoryLendItems?.data.docs.map((item: Item) => (
            <SubmainLendItemCard
              key={item._id}
              item={item}
              categoryName={category.name}
            />
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
