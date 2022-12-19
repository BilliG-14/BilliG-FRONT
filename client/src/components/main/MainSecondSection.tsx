import {
  SpeechBubbleLeft,
  SpeechBubbleRight,
} from 'components/main/SpeechBubble';

export default function MainSecondSection() {
  return (
    <section className="max-w-screen-lg h-screen text-b-text-gray">
      <SpeechBubbleLeft content="너무 비싸서 사는 건 부담이에요" />
      <SpeechBubbleRight content="안쓰는 걸 빌려주고 돈을 벌어요!" />
      <SpeechBubbleLeft content="환경오염을 줄이고 싶어요" />
      <SpeechBubbleRight content="필요한 사람에게 대여해줄래요!" />
    </section>
  );
}
