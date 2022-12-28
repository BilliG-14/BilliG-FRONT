import useScrollFadeIn from 'hooks/useScrollFadeIn';

type WrapItemProps = {
  content: string;
  imgsrc: string;
  detail: string;
};
function WrapItem(props: WrapItemProps) {
  const { content, imgsrc, detail } = props;
  return (
    <div className="w-[318px] h-[400px] bg-b-text-brightgray rounded-3xl overflow-hidden break-keep">
      <img src={imgsrc} alt="" className="object-cover w-full h-1/2" />
      <p className="text-xl h-14 text-black mx-5 mt-5 mb-3 font-bold flex items-center">
        {content}
      </p>
      <p className="text-b-text-darkgray mx-5 leading-6">{detail}</p>
    </div>
  );
}
function WrapList() {
  return (
    <div
      id="wrap"
      className="w-auto flex flex-nowrap justify-start gap-5 animate-marquee"
    >
      <WrapItem
        content="급하게 노트북이 필요할 때 빌려쓸 수 있어서 좋아요"
        detail="온라인 회의를 하러 카페에 나왔는데, 노트북을 깜빡했어요. 다행히 빌리지를 통해 주변에서 노트북을 빌릴 수 있었습니다!"
        imgsrc={`${process.env.PUBLIC_URL}/img/marquee1.jpg`}
      />
      <WrapItem
        content="돈을 절약할 수 있어요!"
        imgsrc={`${process.env.PUBLIC_URL}/img/marquee2.jpg`}
        detail="한번 입을 한복, 돈 주고 사긴 아까운데 빌리지 덕분에 돈을 절약할 수 있었어요."
      />
      <WrapItem
        content="필요한 사람에게 물건을! 😙"
        imgsrc={`${process.env.PUBLIC_URL}/img/marquee3.jpg`}
        detail="버리긴 아깝고, 사용하지는 않는 물건들을 빌리지를 통해 필요한 사람에게 빌려 줄 수 있어요."
      />
      <WrapItem
        content="스키장비도 집 근처에서 대여할 수 있습니다."
        imgsrc={`${process.env.PUBLIC_URL}/img/marquee4.jpg`}
        detail="대여점까지 가지 않아도, 스키장비를 집 근처에서 편하게 대여할 수 있어요"
      />
      <WrapItem
        content="한번 다녀오는 캠핑, 장비는 빌리지에서 빌리자"
        imgsrc={`${process.env.PUBLIC_URL}/img/marquee5.jpg`}
        detail="가족들이랑 캠핑을 가고싶어도 장비가 너무 비싸서 망설이고 있었는데, 빌리지에서 고민 해결!"
      />
    </div>
  );
}
export default function MainSecondSection() {
  const fadeInDiv = useScrollFadeIn();
  return (
    <section className="w-screen h-[850px] bg-amber-500 mx-auto text-b-text-gray">
      <div className="max-w-screen-lg mx-auto pt-40">
        <p className="text-black text-4xl font-extrabold text-left">
          아껴쓰고 나눠쓰고 바꿔쓰고 다시쓰고
        </p>
        <p className="text-black text-6xl font-extrabold text-left">
          빌리지와 함께라면 가능합니다.
        </p>
      </div>
      <div
        {...fadeInDiv}
        id="marquee_container"
        className="w-screen overflow-hidden relative h-[420px] mt-20"
      >
        <div id="marquee_inner" className="w-[300%] absolute flex gap-5">
          <WrapList />
          <WrapList />
          <WrapList />
        </div>
      </div>
      {/* <SpeechBubbleLeft content="너무 비싸서 사는 건 부담이에요" />
        <SpeechBubbleRight content="안쓰는 걸 빌려주고 돈을 벌어요!" />
        <SpeechBubbleLeft content="환경오염을 줄이고 싶어요" />
        <SpeechBubbleRight content="필요한 사람에게 대여해줄래요!" /> */}
    </section>
  );
}
