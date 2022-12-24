import React from 'react';
import { FaPeopleArrows } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';

type DealProps = {
  deal: string;
};

export default function DealTag({ deal }: DealProps) {
  return (
    <div
      className={`${
        deal === '직거래' ? 'bg-b-tag-dir' : 'bg-b-tag-pack'
      } item_tag inline-flex text-b-hash-text p-1 rounded-lg font-extrabold mb-1 mr-1`}
    >
      {deal === '직거래' ? (
        <FaPeopleArrows className="mr-1 text-sm" />
      ) : (
        <GoPackage className="mr-1 text-sm" />
      )}

      <span className="text-xs">{deal}</span>
    </div>
  );
}
