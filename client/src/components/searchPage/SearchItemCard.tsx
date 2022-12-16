import React from 'react';
import DealTag from 'components/tag/DealTag';

export default function SearchItemCard() {
  return (
    <div>
      <li className="flex w-full justify-center">
        <div className="item_info flex w-3/5 border-b-2 border-solid border-b-yellow">
          <a href="#">
            <img
              src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
              alt="m2 맥북"
              className="w-24 h-24 m-auto"
            />
          </a>
          <div className="w-4/5 p-3 pl-10">
            <a href="#">
              <p className="text-lg font-semibold">
                Apple 2022 맥북 프로 13 M2 대여해드려요
              </p>
            </a>
            <ul>
              <li className="font-semibold mb-2">
                <span>작성자 : </span>
                <span>명륜진사갈비</span>
              </li>
              <li className="text-b-text-darkgray">
                <span>거래지역 : </span>
                <span>📍 서울시 중랑구</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="item_deal_price border-b-2 border-solid border-b-yellow">
          <DealTag deal="직거래" />
          <div className="price text-right">
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
