import { useCallback, useEffect, useState, useRef } from 'react';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
import { darkStore } from 'store/NavStore';

export default function DarkToggle() {
  const checkRef = useRef<HTMLInputElement>(null);
  const { dark, setDark } = darkStore();
  const toggleDarkMode = useCallback(() => {
    if (dark) {
      // 다크모드 -> 기본모드
      document.documentElement.classList.remove('dark'); // html class에서 dark클래스 삭제
      setDark(false);
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add('dark'); // html의 class에 dark 클래스 추가
      setDark(true);
    }
  }, [dark, setDark]);
  /*시스템 설정에 따른 다크모드 + 사용자 지정 테마(로컬스토리지) */
  useEffect(() => {
    if (dark || window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      if (checkRef.current) checkRef.current.defaultChecked = true;
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      if (checkRef.current) checkRef.current.defaultChecked = false;
      setDark(false);
    }
  }, [dark, setDark]);

  return (
    <div
      className={`flex items-center justify-center
    ${window.matchMedia('(prefers-color-scheme: dark)').matches && 'hidden'}`}
    >
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative bg-transparent">
          <input
            ref={checkRef}
            type="checkbox"
            id="toggle"
            className="sr-only peer/toggle"
            disabled={window.matchMedia('(prefers-color-scheme: dark)').matches}
            onClick={() => {
              toggleDarkMode();
            }}
          />
          <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
          <div
            id="dot"
            className="flex justify-center items-center absolute left-1 top-1 bg-b-yellow w-6 h-6 rounded-full transition
            peer-checked/toggle:translate-x-full peer-checked/toggle:bg-sky-400"
          >
            {dark ? (
              <BsMoonFill color="#FFFFFF" size={'0.8rem'} />
            ) : (
              <BsFillSunFill color="#FFFFFF" size={'0.8rem'} />
            )}
          </div>
        </div>
      </label>
    </div>
  );
}
