import React from 'react';
import BorrowItemCard from './BorrowItemCard';

export default function MyBorrowPostList() {
  return (
    <div className="w-4/5 p-12">
      <BorrowItemCard />
      <BorrowItemCard />
      <BorrowItemCard />
      <BorrowItemCard />
      <BorrowItemCard />
    </div>
  );
}
