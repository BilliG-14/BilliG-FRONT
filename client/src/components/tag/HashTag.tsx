import React from 'react';

interface HashTagProp {
  name: string;
}

export default function HashTag({ name }: HashTagProp) {
  return (
    <div className="item_tag inline-flex bg-b-yellow text-b-hash-text px-3 py-1 rounded-lg font-extrabold my-2 mx-1">
      <span className="text-xs">{name}</span>
    </div>
  );
}
