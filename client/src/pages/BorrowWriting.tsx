import { useRef } from 'react';
import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
  reservationStore,
} from './../store/PostStore';

import HashTagSection from '../components/postWrite/HashTagWrite';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import ReservationDate from './../components/postWrite/ReservationDate';

import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function BorrowWriting() {
  // 빌립니다 글쓰기
  // store에서 가져오는 state들
  const { hashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();
  const { tradeWay } = tradeWayStore();
  const { reservationDate } = reservationStore();

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDayRef = useRef<HTMLInputElement>(null);
  const priceTimeRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  // useMutate 정의
  // const postData = useMutation(
  //   (data: FormData) =>
  //     axios({
  //       method: 'POST',
  //       url: 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/product/',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       data: data,
  //     }),
  //   {
  //     onSuccess: (data) => {
  //       // 요청이 성공한 경우
  //       console.log(data);
  //     },
  //     onError: (error) => {
  //       // 요청에 에러가 발생된 경우
  //       console.log('onError');
  //     },
  //   },
  // );

  // const onSavePerson = () => {
  //   savePerson.mutate(person); // 데이터 저장
  // };

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

  // 등록하기 클릭 시 event
  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // 서버에 데이터 저장
    // postData.mutate(formData);

    // const submitPost = await axios({
    //   method: 'POST',
    //   url: ``,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   data: formData,
    // });
    // console.log(submitPost);
    // axios
    //   .post(
    //     'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/product',
    //     formData,
    //   )
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err));

    // const postSurvey = await axios({
    //   method: 'POST',
    //   url: 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/product/',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((result) => console.log(result))
    //   .catch((err) => console.log(err));

    const postSurvey = await axios({
      method: 'GET',
      url: 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/product/',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((result) => navigate(`/read/borrow/${result.data[0]._id}`))
      .catch((err) => console.log(err));
    // navigate('/read/borrow');
    console.log('postSurvey', postSurvey);

    // /* key 확인하기 */
    // for (const key of formData.keys()) {
    //   console.log(key);
    // }

    // /* value 확인하기 */
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
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
          <ReservationDate />

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
