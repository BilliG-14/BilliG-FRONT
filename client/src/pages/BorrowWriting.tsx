import { useRef, useState } from 'react';
import { imageUploadStore, hashTagStore } from './../store/PostStore';

import HashTagSection from '../components/postWrite/HashTagWrite';
import ImageUpload from '../components/postWrite/ImageUpload';

export default function BorrowWriting() {
  // store에서 가져오는 state들
  const { hashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();

  // 빌립니다 글쓰기
  const today = new Date()
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDay = useRef<HTMLInputElement>(null);
  const priceTime = useRef<HTMLInputElement>(null);
  const period = useRef<HTMLInputElement>(null);
  const category = useRef<HTMLSelectElement>(null);

  // 등록하기 클릭 시
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(productNameRef.current?.value);
    console.log(priceDay.current?.value);
    console.log(priceTime.current?.value);
    console.log(period.current?.value);
    console.log(
      category.current?.options[category.current?.selectedIndex].innerText,
    );
    console.log(hashTags);

    console.log('file', imgFiles);
    console.log(tradeWay);
  }

  type TradeWayType = {
    direct: boolean;
    delivery: boolean;
  };

  const [direct, setDirect] = useState(true);
  const [delivery, setDelivery] = useState(true);

  const [tradeWay, setTradeWay] = useState<TradeWayType>({
    direct: false,
    delivery: false,
  });

  function directCheckBoxClick(e: React.MouseEvent<HTMLInputElement>) {
    console.log(e.currentTarget.checked);
    setDirect(e.currentTarget.checked);
    setTradeWay((state) => {
      return { ...state, direct };
    });
  }

  function deliveryCheckBoxClick(e: React.MouseEvent<HTMLInputElement>) {
    console.log(e.currentTarget.checked);
    setDelivery(e.currentTarget.checked);
    setTradeWay((state) => {
      return { ...state, delivery };
    });
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-[800px] flex flex-col justify-center mx-auto text-b-text-black">
        <div className="h-80">header</div>
        <div className="mb-6 text-3xl">빌리기</div>
        <form>
          {/* 상품명/카테고리 section */}
          <section className="flex mb-4">
            <select
              ref={category}
              className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
            >
              <option value="1">카테고리</option>
              <option value="2">IT/가전</option>
              <option value="3">의류</option>
              <option value="4">캠핑/레저</option>
              <option value="5">완구/취미</option>
              <option value="6">도서/음반</option>
            </select>
            <input
              ref={productNameRef}
              id="productName"
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명"
            />
          </section>

          {/* 사진 업로드 component */}
          <ImageUpload />

          {/* 요금 section */}
          <section className="flex items-center mb-4">
            <div className="w-[100px] p-3 text-center">요금</div>
            <input
              ref={priceTime}
              type="number"
              className="appearance: none p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div className="mr-5">원/시간</div>
            <input
              ref={priceDay}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 빌리는 기간 section */}
          <section className="mb-4 flex items-center">
            <div className="w-[100px] p-3 text-center">예약기간</div>
            <input
              ref={period}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div>~</div>
            <input
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
              className="p-3 w-full h-40 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 거래방법 section */}
          <section className="mb-4 h-10 flex items-center">
            <span className="w-[100px] p-3 text-center">거래방법</span>
            <input
              onClick={directCheckBoxClick}
              type="checkbox"
              className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
            />
            <span className="mr-7">직거래</span>
            <input
              onClick={deliveryCheckBoxClick}
              type="checkbox"
              className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
            />
            <span>택배거래</span>
          </section>

          {/* 해시태그 component */}
          <HashTagSection />

          <section className="flex flex-col justify-center items-center">
            <button
              onClick={handleButtonClick}
              className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              등록하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
