import React from 'react';
import { ItemType } from './Category';
import ItemCard from './ItemCard';
import { HiArrowRight } from 'react-icons/hi';
type ItemListProps = {
  itemList: ItemType[];
  category: string;
  idx: number;
};

export default function CategorySection({
  itemList,
  category,
  idx,
}: ItemListProps) {
  return (
    <section className={`${bg[idx]} max-w-screen-lg mt-4 p-9`}>
      <div>
        <header className="flex justify-between px-12">
          <h2 className="text-white text-4xl font-extrabold">{category}</h2>
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
}

const bg: string[] = [
  'bg-b-bg-sec0',
  'bg-b-bg-sec1',
  'bg-b-bg-sec2',
  'bg-b-bg-sec3',
  'bg-b-bg-sec4',
  'bg-b-bg-sec5',
];
