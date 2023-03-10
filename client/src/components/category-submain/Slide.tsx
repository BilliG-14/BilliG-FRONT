import { useNavigate } from 'react-router-dom';

interface SlideProps {
  idx: number;
  card: string;
  PrevSlide: () => void;
  NextSlide: () => void;
}

export default function Slide({ idx, card, PrevSlide, NextSlide }: SlideProps) {
  const navigate = useNavigate();
  return (
    <>
      <div
        key={idx}
        className="h-[435px] 2xl:w-[1535px] xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[640px] flex-none relative"
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/carousel${idx + 1}.webp`}
          alt="IT"
          className="w-full h-full cursor-pointer object-contain"
          onClick={() => {
            navigate(`${card}`);
          }}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={PrevSlide}
            className="w-12 h-12 bg-b-yellow rounded-full text-gray-200 cursor-pointer"
          >
            ❮
          </button>
          <button
            onClick={NextSlide}
            className="w-12 h-12 bg-b-yellow rounded-full text-gray-200 cursor-pointer"
          >
            ❯
          </button>
        </div>
      </div>
    </>
  );
}
