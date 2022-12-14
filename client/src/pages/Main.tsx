import MainButton from 'components/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import { SpeechBubbleLeft, SpeechBubbleRight } from 'components/SpeechBubble';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

function MainFirstSection() {
  return (
    <section className="max-w-screen-lg h-screen font-semibold">
      <div className="text-left p-32 pt-44 animate-fade-in text-b-text-black">
        <p className="text-4xl">물건을 빌리는 가장 쉬운 방법</p>
        <p className="text-6xl">초간편 물품 대여 중계 플랫폼</p>
        <p className="text-6xl text-b-yellow font-extrabold">빌리지</p>
      </div>
    </section>
  );
}
function MainSecondSection() {
  return (
    <section className="max-w-screen-lg h-screen text-b-text-gray">
      <SpeechBubbleLeft content="너무 비싸서 사는 건 부담이에요" />
      <SpeechBubbleRight content="안쓰는 걸 빌려주고 돈을 벌어요!" />
      <SpeechBubbleLeft content="환경오염을 줄이고 싶어요" />
      <SpeechBubbleRight content="필요한 사람에게 대여해줄래요!" />
    </section>
  );
}
function MainStepSection() {
  return (
    <section className="max-w-screen-lg h-screen text-center">
      <div className="text-4xl my-24">
        <span className=" text-amber-500 font-extrabold">빌리지</span>로 물품
        대여 시간과 비용을 절약하세요!{' '}
        <p className="text-5xl">최대 65% 절감 효과!</p>
      </div>
      <div>
        <StepDiscription
          num={1}
          content="빌려 주실
          물품의 사진과 이름, 대여 비용과 상세 설명을 작성해주세요!"
        />
        <StepDiscription
          num={2}
          content="물품을 빌려가실 때, 상대방에게 바로 대화를 걸어보세요!"
        />
        <StepDiscription
          num={3}
          content="물품을 빌려가실 때, 대여기간을 설정한 후 대여 요청을
          보내주세요!"
        />
        <StepDiscription
          num={4}
          content="대여하신 물품은 깨끗하게 사용하시고 반납해주세요"
        />
      </div>
    </section>
  );
}
export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <MainFirstSection />
      <MainSecondSection />
      <MainStepSection />
      <div className="mt-48">
        <MainButton content="물품 빌리러 가기" />
        <MainButton content="물품 빌려주러 가기" />
      </div>
      <ScrollTopButton />
    </div>
  );
}

type StepProps = {
  num: number;
  content: string;
};

function StepDiscription(props: StepProps) {
  const fadeInDiv = useScrollFadeIn();
  return (
    <div className="text-2xl" {...fadeInDiv}>
      <span className="text-amber-600 font-bold">{props.num}.</span>{' '}
      {props.content}
      <StepImageDiv />
    </div>
  );
}

function StepImageDiv() {
  return (
    <div className=" w-full h-36 my-2 mx-auto rounded-3xl bg-slate-200"></div>
  );
}
