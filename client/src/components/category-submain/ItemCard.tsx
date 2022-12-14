import { FaPeopleArrows } from 'react-icons/fa';

export default function ItemCard() {
  return (
    <div className="w-1/5 inline-block my-5 px-2.5 border-b border-gray-300 border-solid ">
      <a href="#">
        <div className="pic mb-2">
          <img
            src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
            alt="m2 맥북"
          />
        </div>
        <div className="item_info my-2 text-left">
          <div className="title ">
            <p className="name mb-1 font-bold leading-6 underline underline-offset-4">
              Apple 2022 맥북 프로 13 M2 대여해드려요
            </p>
            <p className="category mb-1 text-b-text-darkgray text-sm">IT기기</p>
            <p className="adress text-b-text-darkgray text-sm">
              📍서울시 동대문구
            </p>
          </div>
          <div className="item_tag inline-flex bg-b-tag-dir text-b-hash-text p-1 rounded-lg font-extrabold my-2">
            <FaPeopleArrows className="mr-1 text-sm" />
            <span className="text-xs">직거래</span>
          </div>
          <div className="price text-right">
            <p className="per_time mb-2">
              <span className="font-semibold"> 5,000원</span>
              <span className="text-xs"> / 시간</span>
            </p>
            <p className="per_day">
              <span className="font-semibold"> 30,000원</span>
              <span className="text-xs"> / 일</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
