import { useRef, useState, useEffect } from 'react';
import Slide from './Slide';

const TOTAL_SLIDES = 3;

export default function CarouselS() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    if (slideRef.current != null) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  return (
    <div className="h-[435px] 2xl:w-[1535px] xl:w-[1280px] lg:w-[1024px] md:w-[768px] sm:w-[640px] m-auto overflow-hidden">
      <div ref={slideRef} className="flex">
        {url.map((card, idx) => (
          <Slide
            key={idx}
            idx={idx}
            card={card}
            PrevSlide={PrevSlide}
            NextSlide={NextSlide}
          />
        ))}
      </div>
    </div>
  );
}

const url = [
  '/products/lend/63a16fcf1027a8c93f03addc',
  '/products/lend/63a16fe01027a8c93f03ade0',
  '/products/lend/63a16fe91027a8c93f03ade2',
  '/notices/63a99800bceda7b05ae793de',
];
