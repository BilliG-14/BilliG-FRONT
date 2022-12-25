import MainFirstSection from 'components/main/MainFirstSection';
import MainSecondSection from 'components/main/MainSecondSection';
import MainThirdSection from 'components/main/MainThirdSection';
import MainButton from 'components/main/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import Nav from 'components/nav/Nav';
import { useEffect, useRef, useState } from 'react';

export default function Main() {
  const mainDivRef = useRef<HTMLDivElement>(null);
  // const [throttle, setThrottle] = useState<boolean>(false);
  // useEffect(() => {
  //   let page = 0;
  //   const handleWheel = (e: WheelEvent) => {
  //     e.preventDefault();
  //     if (throttle) return;
  //     setThrottle(true);
  //     setTimeout(async () => {
  //       if (e.deltaY > 20) {
  //         page = page === 3 ? page : page + 1;
  //       } else if (e.deltaY < -20) {
  //         page = page === 1 ? page : page - 1;
  //       }
  //       const posTop = (page - 1) * window.innerHeight;
  //       mainDivRef.current?.scrollTo({ top: posTop, behavior: 'smooth' });
  //       setThrottle(false);
  //     }, 300);
  //   };
  //   mainDivRef.current?.addEventListener('wheel', handleWheel);
  //   return () => mainDivRef.current?.removeEventListener('wheel', handleWheel);
  // }, []);
  return (
    <div ref={mainDivRef} className="w-screen h-screen mx-auto ">
      <div className="max-w-screen-lg mx-auto">
        <Nav />
      </div>
      <MainFirstSection />
      <MainSecondSection />
      <MainThirdSection />
      <div className="max-w-screen-lg mx-auto flex justify-center text-lg hover:font-extrabold pb-16">
        <MainButton content="물품 빌리러 가기" path="/submain/lend" />
        <MainButton content="물품 빌려주러 가기" path="/submain/borrow" />
      </div>
      <ScrollTopButton />
    </div>
  );
}
