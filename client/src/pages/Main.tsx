import MainButton from 'components/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import { useEffect, useState } from 'react';
import background from '../assets/images/first-main-image.png';

function MainFirstSection() {
  return (
    <section className="w-screen h-screen font-semibold">
      <div className="text-left p-32 pt-44 animate-fade-in">
        <p className="text-4xl">물건을 빌리는 가장 쉬운 방법</p>
        <p className="text-7xl">초간편 물품 대여 중계 플랫폼</p>
        <p className="text-7xl text-amber-500 font-extrabold">빌리지</p>
      </div>
    </section>
  );
}

function MainSecondSection() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    console.log(window.scrollY);
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <section className="w-screen h-screen">
      <p className="text-4xl my-24" style={{ opacity: (position - 300) / 50 }}>
        <span className=" text-amber-500 font-extrabold">빌리지</span>로 물품
        대여 시간과 비용을 절약하세요!{' '}
        <p className="text-5xl">최대 65% 절감 효과!</p>
      </p>
      <div>
        <StepDiscription
          num={1}
          content="빌려 주실
          물품의 사진과 이름, 대여 비용과 상세 설명을 작성해주세요!"
          position={position}
        />
        <StepDiscription
          num={2}
          content="물품을 빌려가실 때, 상대방에게 바로 대화를 걸어보세요!"
          position={position}
        />
        <StepDiscription
          num={3}
          content="물품을 빌려가실 때, 대여기간을 설정한 후 대여 요청을
          보내주세요!"
          position={position}
        />
        <StepDiscription
          num={4}
          content="대여하신 물품은 깨끗하게 사용하시고 반납해주세요"
          position={position}
        />
      </div>
    </section>
  );
}
export default function Main() {
  return (
    <>
      <MainFirstSection />
      <MainSecondSection />
      <div>
        <MainButton content="물품 빌리러 가기!" />
        <MainButton content="물품 빌려주러 가기!" />
        <ScrollTopButton />
      </div>
    </>
  );
}
type StepProps = {
  num: number;
  content: string;
  position: number;
};
function StepDiscription(props: StepProps) {
  return (
    <div className="text-2xl" style={{ opacity: (props.position - 600) / 50 }}>
      <span className="text-amber-600 font-bold">step {props.num}.</span>{' '}
      {props.content}
      <StepImageDiv />
    </div>
  );
}

function StepImageDiv() {
  return (
    <div className=" w-1/2 h-36 my-2 mx-auto rounded-3xl bg-slate-200"></div>
  );
}
