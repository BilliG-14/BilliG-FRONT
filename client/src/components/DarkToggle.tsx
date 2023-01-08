import { useCallback, useEffect, useState } from 'react';
import { BsFillSunFill, BsMoonFill } from 'react-icons/bs';
export default function DarkToggle() {
  const [dark, setDark] = useState<boolean>(false);
  const toggleDarkMode = useCallback(() => {
    if (localStorage.getItem('theme') === 'dark') {
      // 다크모드 -> 기본모드
      localStorage.removeItem('theme'); // 다크모드 삭제
      document.documentElement.classList.remove('dark'); // html class에서 dark클래스 삭제 !
      setDark(false);
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add('dark'); // html의 class에 dark 클래스 추가 !
      localStorage.setItem('theme', 'dark'); // localstorage에 dark를 추가해서 ! useEffect에서 처음에 검사해서 다크모드인지 판단해주려고 !
      setDark(true);
    }
  }, []);
  useEffect(() => {
    setDark(localStorage.getItem('theme') === 'dark');
  }, []);
  return (
    <div className="flex items-center justify-center fixed right-10 top-2">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only peer/toggle"
            onClick={() => {
              toggleDarkMode();
            }}
            checked={localStorage.getItem('theme') === 'dark'}
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
