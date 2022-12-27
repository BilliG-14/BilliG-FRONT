import MainFirstSection from 'components/main/MainFirstSection';
import MainSecondSection from 'components/main/MainSecondSection';
import MainThirdSection from 'components/main/MainThirdSection';
import MainButton from 'components/main/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import { useRef } from 'react';

export default function Main() {
  const mainDivRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={mainDivRef} className="w-screen h-screen mx-auto ">
      <MainFirstSection />
      <MainSecondSection />
      <MainThirdSection />
      <div className="max-w-screen-lg mx-auto flex justify-center text-lg hover:font-extrabold pb-16">
        <MainButton content="물품 빌리러 가기" path="/submain" />
        <MainButton content="물품 빌려주러 가기" path="/submain/borrow" />
      </div>
      <ScrollTopButton />
    </div>
  );
}
