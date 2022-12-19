import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';

export default function DoneTag() {
  return (
    <div className="bg-b-tag-done item_tag inline-flex text-b-hash-text py-1 px-3 rounded-lg font-extrabold my-2">
      <GiReceiveMoney className="mr-1 text-base" />
      <span className="text-xs">거래완료</span>
    </div>
  );
}
