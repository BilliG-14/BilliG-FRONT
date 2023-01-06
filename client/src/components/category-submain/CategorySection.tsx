import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/customAxios';
import { PostDataType } from 'types/productType';
import Loading from '../Loading';
import SubmainItemCard from './SubmainItemCard';
import { HiArrowRight } from 'react-icons/hi';

type ItemListProps = {
  type: string;
  category: { _id: string; name: string };
  idx: number;
  sectionRef: React.ForwardedRef<HTMLElement | null>;
};

export default function CategorySection({
  type,
  category,
  idx,
  sectionRef,
}: ItemListProps) {
  const navigate = useNavigate();

  const { isError, data } = useQuery(
    [`category${type}Items/${category._id}`],
    async () => {
      const res = await api.get(
        `/product/page?&postType=${type}&per=4&page=1&stateOfTransaction=0&category=${category._id}`,
      );
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );

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
              navigate(`/products/${type}/${category._id}`);
            }}
          >
            <span className="mr-1">더보기</span>
            <span>
              <HiArrowRight />
            </span>
          </button>
        </header>
        <div className="flex justify-center">
          <Suspense fallback={<Loading />}>
            {data?.docs.map((item: PostDataType) => (
              <SubmainItemCard
                key={item._id}
                item={item}
                type={type}
                categoryName={category.name}
              />
            ))}
          </Suspense>
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
  'bg-b-bg-sec6',
  'bg-b-bg-sec7',
  'bg-b-bg-sec8',
];
