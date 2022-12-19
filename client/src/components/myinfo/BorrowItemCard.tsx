import React from 'react';
import DealTag from 'components/tag/DealTag';

export default function BorrowItemCard() {
  return (
    <div className="h-36 cursor-pointer hover:opacity-70">
      <li className="flex w-full h-full justify-center py-3">
        <div className="item_info flex w-4/5 border-b-2 border-solid border-gray-300">
          <a href="#">
            <img
              src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
              alt="m2 맥북"
              className="w-24 h-24 m-auto"
            />
          </a>
          <div className="w-4/5 p-3 pl-10">
            <a href="#">
              <p className="text-lg font-semibold mt-1">
                Apple 2022 맥북 프로 13 M2 대여합니다
              </p>
            </a>
            <ul>
              <li className="mt-1">
                <span>대여기간 : </span>
                <span>2022.12.13 ~ </span>
                <span>2022.12.25</span>
              </li>
              <li className="text-b-text-darkgray mt-3">
                <span>거래지역 : </span>
                <span>📍 서울시 중랑구</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="item_deal_price border-b-2 border-solid border-gray-300">
          <DealTag deal="직거래" />
          <div className="price text-right mt-1">
            <p className="per_time mb-2">
              <span className="font-semibold"> {`5,000 원`}</span>
              <span className="text-xs"> / 시간</span>
            </p>
            <p className="per_day">
              <span className="font-semibold"> {`30,000 원`}</span>
              <span className="text-xs"> / 일</span>
            </p>
          </div>
        </div>
      </li>
    </div>
  );
}
