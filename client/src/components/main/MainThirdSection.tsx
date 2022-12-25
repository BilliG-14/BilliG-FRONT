import useScrollFadeIn from 'hooks/useScrollFadeIn';

type StepProps = {
  num: number;
  content: string;
};

function StepDiscription(props: StepProps) {
  const { num, content } = props;
  return (
    <div className="text-xl w-96 h-96 mx-1 break-keep flex flex-col items-center rounded-lg shadow-lg shadow-gray-300">
      <p className="bg-b-yellow text-white rounded-lg px-2 font-bold self-start ml-6 mt-4 mb-7">
        step {num}
      </p>
      <img
        src={`${process.env.PUBLIC_URL}/img/step${num}.png`}
        alt=""
        className="w-48 h-48 object-cover mb-10"
      />
      <p>{content}</p>
    </div>
  );
}

export default function MainThirdSection() {
  const fadeInDiv = useScrollFadeIn();
  return (
    <section className="w-screen text-center h-[600px] mb-16">
      <div className="max-w-screen-lg mx-auto text-4xl mt-36 mb-24">
        <p className="mb-2">최대 65% 절감 효과!</p>
        <p className="text-5xl font-extrabold">
          <span className="text-amber-500">빌리지</span>
          시간과 비용을 절약하는 방법
        </p>
      </div>
      <div className="max-w-screen-lg flex mx-auto " {...fadeInDiv}>
        <StepDiscription
          num={1}
          content="대여할 물품의 사진과 이름, 대여 비용과 상세 설명을 작성해주세요"
        />
        <StepDiscription
          num={2}
          content="물품을 빌려가실 때, 상대방에게 바로 대화를 걸어보세요"
        />
        <StepDiscription
          num={3}
          content="대여하신 물품은 깨끗하게 사용하시고 반납해주세요"
        />
      </div>
    </section>
  );
}
