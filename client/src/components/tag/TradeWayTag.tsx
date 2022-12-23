// 우선 사용하지 않는 파일입니다 ㅠㅠ 곧 사용할 예정이니 이 파일은 무시하세요 (2022-12-21 민영)

import React from 'react';
import { FaPeopleArrows } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';

type DealProps = {
  tradeWay: {
    direct: boolean;
    delivery: boolean;
  };
};

export default function TradeWayTag({ tradeWay }: DealProps) {
  return (
    <>
      <div
        className={`${
          tradeWay.direct ? 'bg-b-tag-dir' : ''
        } item_tag inline-flex text-b-hash-text p-1 rounded-lg font-extrabold my-2`}
      >
        {tradeWay.direct ? <FaPeopleArrows className="mr-1 text-sm" /> : ''}

        <span className="text-xs">{tradeWay.direct ? '직거래' : ''}</span>
      </div>
      <div
        className={`${
          tradeWay.delivery ? 'bg-b-tag-pack' : ''
        } item_tag inline-flex text-b-hash-text p-1 rounded-lg font-extrabold my-2`}
      >
        {tradeWay.delivery ? <GoPackage className="mr-1 text-sm" /> : ''}

        <span className="text-xs">{tradeWay.delivery ? '택배거래' : ''}</span>
      </div>
    </>
  );
}
