import { useRef, useState, MouseEvent, ChangeEvent } from 'react';
import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
} from './../store/PostStore';

import HashTagSection from '../components/postWrite/HashTagWrite';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import axios from 'axios';

export default function BorrowWriting() {
  // store에서 가져오는 state들
  const { hashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();
  const { tradeWay } = tradeWayStore();

  // 빌립니다 글쓰기
  const today = new Date()
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDayRef = useRef<HTMLInputElement>(null);
  const priceTimeRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [reservationDate, setReservationDate] = useState({
    start: '',
    end: '',
  });

  function startDate(e: ChangeEvent<HTMLInputElement>) {
    const newReservationDate = {
      ...reservationDate,
      start: e.currentTarget.value,
    };
    setReservationDate(newReservationDate);
  }

  function endDate(e: ChangeEvent<HTMLInputElement>) {
    const newReservationDate = {
      ...reservationDate,
      end: e.currentTarget.value,
    };
    setReservationDate(newReservationDate);
  }

  // 등록하기 클릭 시 event
  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // formData 에 넣기
    const formData = new FormData();

    // 업로드된 이미지 파일 넣기
    imgFiles.forEach((imgFile) => formData.append('productImg', imgFile));

    // 이미지 파일 제외한 나머지 data json 형식으로 넣기
    const writeData = {
      category:
        categoryRef.current?.options[categoryRef.current?.selectedIndex]
          .innerText,
      title: productNameRef.current?.value,
      // imgFiles,
      priceDay: priceDayRef.current?.value,
      priceTime: priceTimeRef.current?.value,
      reservationDate: reservationDate,
      description: descriptionRef.current?.value,
      tradeWay: tradeWay,
      hashTags: hashTags,
    };
    formData.append('data', JSON.stringify(writeData));

    // const submitPost = await axios({
    //   method: 'POST',
    //   url: ``,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   data: formData,
    // });
    // console.log(submitPost);

    /* key 확인하기 */
    console.log(formData.keys());

    for (const key of formData.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (const value of formData.values()) {
      console.log(value);
    }
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
              ref={categoryRef}
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
              ref={priceTimeRef}
              type="number"
              className="appearance: none p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div className="mr-5">원/시간</div>
            <input
              ref={priceDayRef}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 빌리는 기간 section */}
          <section className="mb-4 flex items-center">
            <div className="w-[100px] p-3 text-center">예약기간</div>
            <input
              onChange={startDate}
              ref={periodRef}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div>~</div>
            <input
              onChange={endDate}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              ref={descriptionRef}
              placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
              className="p-3 w-full h-40 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 거래방법 section */}
          <TradeWay />

          {/* 해시태그 component */}
          <HashTagSection />

          <section className="flex flex-col justify-center items-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-100"
            >
              등록하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
