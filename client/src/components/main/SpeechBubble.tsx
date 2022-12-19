import useScrollPop from 'hooks/useScrollPop';
export type SpeechBubbleProps = {
  content: string;
};

export function SpeechBubbleLeft({ content }: SpeechBubbleProps) {
  const fadeInDiv = useScrollPop('right');
  return (
    <div
      {...fadeInDiv}
      className={`relative rounded-lg bg-b-yellow h-24 text-white font-bold text-xl my-16 flex flex-col justify-center mr-24
      after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-0 after:h-0
      after:border-[33px] after:border-solid after:border-transparent
      after:border-r-[#e65c00] after:border-l-0 after:border-b-0
        after:-mt-3 after:-ml-7 bg-gradient-to-r from-[#e65c00] to-[#f5af19]`}
    >
      <p className="px-36">{content}</p>
    </div>
  );
}
export function SpeechBubbleRight({ content }: SpeechBubbleProps) {
  const fadeInDiv = useScrollPop('left');
  return (
    <div
      {...fadeInDiv}
      className={`relative rounded-xl bg-b-yellow h-24 text-white font-bold text-xl my-16 flex flex-col justify-center ml-24
      after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-0 after:h-0
      after:border-[33px] after:border-solid after:border-transparent
      after:border-r-0 after:border-b-0
      after:border-l-[#f5af19] after:-mt-3 after:-mr-7  bg-gradient-to-r from-[#e65c00] to-[#f5af19]`}
    >
      <p className="px-36">{content}</p>
    </div>
  );
}
