import CategoryNav from './CategoryNav';
import { useState } from 'react';
import CategorySection from './CategorySection';

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

  return (
    <div className="">
      <CategoryNav />
      <div className="">
        {categoryList.map((category, idx) => (
          <CategorySection
            key={idx}
            itemList={itemList}
            category={category}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}

const categoryList: string[] = [
  'IT기기',
  '생활가전',
  '캠핑/여행',
  '스포츠/레저',
  '완구/취미',
  '도서/음반',
];
