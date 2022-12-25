import React from 'react';
import DealTag from 'components/tag/DealTag';
import { Item } from './MyLendPostList';
import { useNavigate } from 'react-router-dom';

interface BorrowPostProps {
  item: Item;
}

export default function BorrowItemCard({ item }: BorrowPostProps) {
  const { title, address, imgUrl, tradeWay, price, period } = item;
  const navigate = useNavigate();
  return (
    <div
      className="h-36 cursor-pointer hover:opacity-70"
      onClick={() => {
        navigate(`/read/${item._id}`);
      }}
    >
      <li className="flex w-full h-full justify-center py-3">
        <div className="item_info flex w-4/5 border-b-2 border-solid border-gray-300">
          <img src={imgUrl[0]} alt="m2 맥북" className="w-24 h-24" />
          <div className="w-4/5 p-3 pl-10">
            <p className="text-lg font-semibold mt-1">{title}</p>
            <ul>
              <li className="mt-1">
                <span>대여기간 : </span>
                <span>{`${period.start} ~ `}</span>
                <span>{`${period.end}`}</span>
              </li>
              <li className="text-b-text-darkgray mt-3">
                <span>거래지역 : </span>
                <span>{`📍 ${address}`}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="item_deal_price flex flex-col justify-center border-b-2 border-solid border-gray-300">
          <div className="flex flex-col justify-center items-center">
            {tradeWay.direct ? <DealTag deal="직거래" /> : null}
            {tradeWay.delivery ? <DealTag deal="택배거래" /> : null}
          </div>
          <div className="price text-right mt-1">
            <p className="per_time mb-2">
              <span className="font-semibold">{`${price.priceTime.toLocaleString(
                'ko-KR',
              )} 원`}</span>
              <span className="text-xs"> / 시간</span>
            </p>
            <p className="per_day">
              <span className="font-semibold">{`${price.priceDay.toLocaleString(
                'ko-KR',
              )} 원`}</span>
              <span className="text-xs"> / 일</span>
            </p>
          </div>
        </div>
      </li>
    </div>
  );
}
