import useScrollFadeIn from '../hooks/useScrollFadeIn';
export type SpeechBubbleProps = {
  content: string;
};

export function SpeechBubbleLeft({ content }: SpeechBubbleProps) {
  const fadeInDiv = useScrollFadeIn();
  return (
    <div
      {...fadeInDiv}
      className={`relative rounded-lg bg-amber-600 w-1/3 h-24 text-white font-bold text-xl ml-36 my-16 flex flex-col justify-center
      after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-0 after:h-0
      after:border-[33px] after:border-solid after:border-transparent
      after:border-r-amber-600 after:border-l-0 after:border-b-0
        after:-mt-3 after:-ml-7`}
    >
      <p>{content}</p>
    </div>
  );
}
export function SpeechBubbleRight({ content }: SpeechBubbleProps) {
  const fadeInDiv = useScrollFadeIn();
  return (
    <div
      {...fadeInDiv}
      className={`relative rounded-lg bg-amber-600 w-1/3 h-24 text-white font-bold text-xl ml-72 my-16 flex flex-col justify-center
      after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-0 after:h-0
      after:border-[33px] after:border-solid after:border-transparent
      after:border-r-0 after:border-b-0
      after:border-l-amber-600 after:-mt-3 after:-mr-7`}
    >
      <p>{content}</p>
    </div>
  );
}
