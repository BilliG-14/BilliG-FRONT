import React from 'react';
import DoneItemCard from './DoneItemCard';

export default function MyDoneList() {
  return (
    <div className="w-4/5 p-12">
      <DoneItemCard />
      <DoneItemCard />
      <DoneItemCard />
      <DoneItemCard />
      <DoneItemCard />
    </div>
  );
}
