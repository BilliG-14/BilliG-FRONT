import React from 'react';

import { FaRegHandshake } from 'react-icons/fa';

type DealProps = {
  stateOfTransaction: number;
};

export default function DealStepTag({ stateOfTransaction }: DealProps) {
  return (
    <div
      className={`bg-orange-600 item_tag inline-flex text-b-hash-text p-1 rounded-lg font-extrabold mb-1 mr-1`}
    >
      <FaRegHandshake className="mr-1 text-sm" />
      <span className="text-xs">거래중</span>
    </div>
  );
}
