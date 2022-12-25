import React, { Dispatch, SetStateAction } from 'react';

export default function GoWriteBtn({
  setOnWriteBtn,
}: {
  setOnWriteBtn: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mr-5">
      <button
        className="text-xl font-bold hover:text-b-yellow hover:ease-in hover:opacity-0 duration-300"
        onMouseOver={() => {
          setTimeout(() => {
            setOnWriteBtn((prev) => !prev);
          }, 400);
        }}
      >
        물품 등록하기
      </button>
    </div>
  );
}
