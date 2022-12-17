import React from 'react';
import { useMyIntroEditStore } from '../../store/MypageStore';

export default function MypageNickIntro() {
  const { toggleIntro } = useMyIntroEditStore();
  return (
    <div className="nick_intro pl-7 w-full relative">
      <div>
        <h2 className="nick text-3xl font-extrabold">yihyun</h2>
        <p className="intro my-4 font-medium">
          맥북2 대여를 전문으로 하고 있습니다. 연락주세요
        </p>
      </div>
      <div className="mt-20 absolute right-32 bottom-10">
        <button
          className="bg-b-yellow text-white rounded-md font-bold px-4 py-2"
          onClick={() => {
            toggleIntro();
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
}
