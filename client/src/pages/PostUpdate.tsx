import { useState, useRef, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import api from './../api/customAxios';

import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
  reservationStore,
  CategoryType,
  categoryStore,
  UpdateImageUploadStore,
} from './../store/PostWriteStore';

import HashTagSection from '../components/postWrite/HashTagWrite';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import ReservationDate from './../components/postWrite/ReservationDate';
import { PostDataType } from './../store/PostReadStore';
import Category from 'components/postWrite/Category';
import UpdatedImageUpload from 'components/postWrite/UpdatedImageUpload';

export default function PostUpdate() {
  // 빌립니다 글쓰기
  // store에서 가져오는 state들
  const { hashTags, serverHashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();
  const { tradeWay, setTradeWay } = tradeWayStore();
  const { reservationDate, setReservationDate } = reservationStore();
  const { filteredCategory, setFilteredCategory } = categoryStore();
  const { imgUrlList, setImgUrlList } = UpdateImageUploadStore();

  const navigate = useNavigate();

  // 상품 id 가져오기
  const { id } = useParams();

  // 상품 가져오기
  const [postData, setPostData] = useState<PostDataType>();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<{ priceTime: number; priceDay: number }>({
    priceTime: 0,
    priceDay: 0,
  });
  const [description, setDescription] = useState<string>('');

  useQuery(['userData'], () => api.get(`/product/${id}`), {
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 60,
    onSuccess: (data) => {
      setPostData(data?.data[0]);
      setFilteredCategory(data?.data[0].category._id);
      setImgUrlList(data?.data[0].imgUrl);
      setTitle(data?.data[0].title);
      setPrice(data?.data[0].price);
      setDescription(data?.data[0].description);
      setTradeWay(
        data?.data[0].tradeWay.direct,
        data?.data[0].tradeWay.delivery,
      );
      serverHashTags(data?.data[0].hashtag);
      setReservationDate(data?.data[0].period.start, data?.data[0].period.end);
    },
    onError: (err) => console.log('데이터 가져오기 에러', err),
  });

  // 글 업데이트
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  function changePriceTime(e: ChangeEvent<HTMLInputElement>) {
    const newPrice = { ...price, priceTime: Number(e.currentTarget?.value) };
    setPrice(newPrice);
  }

  function changePriceDay(e: ChangeEvent<HTMLInputElement>) {
    const newPrice = { ...price, priceDay: Number(e.currentTarget?.value) };
    setPrice(newPrice);
  }

  function changeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.currentTarget.value);
  }

  // 서버로 post 보내기, useMutate 정의
  const updatedPostData = useMutation(
    () =>
      api.patch(
        `/product/${id}`,
        postData?.postType === 'lend'
          ? {
              category: filteredCategory,
              title: title,
              description: description,
              price: price,
              tradeWay: tradeWay,
              hashtag: hashTags,
            }
          : {
              category: filteredCategory,
              title: title,
              description: description,
              price: price,
              period: reservationDate,
              tradeWay: tradeWay,
              hashtag: hashTags,
            },
      ),
    {
      onSuccess: (res) => {
        navigate(`/read/${res.data._id}`);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  // 등록하기 클릭 시 event
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (filteredCategory === '카테고리 설정' || title === '') {
      alert('카테고리와 이름을 입력해주세요.');
      return;
    } else if (!price.priceDay || !price.priceTime) {
      alert('요금을 입력해주세요.');
      return;
    } else if (!description) {
      alert('상세설명을 입력해주세요.');
      return;
    } else if (!tradeWay.delivery && !tradeWay.direct) {
      alert('거래방법을 선택해주세요.');
      return;
    }

    if (postData?.postType === 'borrow') {
      if (reservationDate.start === '' || reservationDate.end === '') {
        alert('예약기간을 입력해주세요.');
        return;
      }
    }
    // 서버에 데이터 저장
    updatedPostData.mutate();
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-center mx-auto text-b-text-black">
        <div className="mb-6 text-3xl">
          {postData?.postType === 'lend' ? '빌려주기' : '빌리기'}
        </div>
        <form className="w-[800px] mx-auto">
          {/* 상품명/카테고리 section */}
          <section className="flex mb-4">
            <Category categoryId={postData?.category._id} />
            <input
              value={title}
              onChange={changeTitle}
              id="productName"
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명"
            />
          </section>

          {/* 사진 업로드 component */}
          <UpdatedImageUpload bringImgUrlList={imgUrlList} />

          {/* 요금 section */}
          <section className="flex items-center mb-4">
            <div className="w-[100px] p-3 text-center">요금</div>
            <input
              value={price.priceTime}
              onChange={changePriceTime}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div className="mr-5">원/시간</div>
            <input
              value={price.priceDay}
              onChange={changePriceDay}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 빌리는 기간 section */}
          {postData?.postType === 'lend' ? null : <ReservationDate />}

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              value={description}
              onChange={changeDescription}
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
              수정하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
