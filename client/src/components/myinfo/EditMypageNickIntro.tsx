import React from 'react';
import { useMyIntroEditStore } from '../../store/MypageStore';

export default function EditMypageNickIntro() {
  const { toggleIntro } = useMyIntroEditStore();
  return (
    <div className="nick_intro pl-7 w-full relative">
      <form action="">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          name="nickname"
          className="text-3xl font-extrabold border-solid border-stone-200 border rounded-md py-1 px-3"
        />
      </form>
    </div>
  );
}
