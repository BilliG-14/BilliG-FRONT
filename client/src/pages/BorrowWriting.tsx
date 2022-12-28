import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from './../api/customAxios';

import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
  reservationStore,
  CategoryType,
} from './../store/PostWriteStore';

import HashTagSection from '../components/postWrite/HashTag';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import ReservationDate from './../components/postWrite/ReservationDate';
import Loading from 'components/Loading';
import Footer from 'components/footer/Footer';

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
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  // 사용자 가져오기
  const { data, isLoading } = useQuery(
    ['userData'],
    () => api.get('/user/me'),
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );

  // 카테고리 가져오기
  const [categorys, setCategorys] = useState<CategoryType[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<CategoryType[]>([]);

  // 카테고리 받아오기
  useQuery(['categories'], () => api.get('/category'), {
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 60,
    onSuccess: (res) => setCategorys(res.data),
  });

  // 사용자가 선택한 카테고리만 필터
  function changecategory() {
    setFilteredCategory(
      categorys.filter(
        (category) => category._id === categoryRef.current?.value,
      ),
    );
  }

  // 제목 글자수 제한
  function checkWordsNumber(e: React.FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length > 20) {
      alert('상품명은 20자 이내로 입력 가능합니다.');
      e.currentTarget.value = e.currentTarget.value.slice(0, 20);
    }
  }

  // 서버로 post 보내기, useMutate 정의
  const postData = useMutation(
    (formData: FormData) =>
      api.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: (res) => {
        navigate(`/read/${res.data._id}`);
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  // formData 넣기
  const formData = new FormData();

  // 업로드된 이미지 파일 넣기
  imgFiles.forEach((imgFile) => formData.append('images', imgFile));

  // 이미지 파일 제외한 나머지 data json 형식으로 넣기
  const writeData = {
    postType: 'borrow',
    category: filteredCategory[0]?._id,
    author: data?.data?._id,
    title: productNameRef.current?.value,
    description: descriptionRef.current?.value,
    // lender: data?.data,
    stateOfTransaction: 0,
    address: data?.data?.address1,
    price: {
      priceDay: Number(priceDayRef.current?.value),
    },
    period: reservationDate,
    tradeWay: tradeWay,
    hashtag: hashTags,
  };
  formData.append('data', JSON.stringify(writeData));

  // 등록하기 클릭 시 event
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (filteredCategory.length === 0 || productNameRef.current?.value === '') {
      alert('카테고리와 이름을 입력해주세요.');
      return;
    } else if (
      !priceDayRef.current?.value ||
      priceDayRef.current?.value === '0'
    ) {
      alert('요금을 입력해주세요.');
      return;
    } else if (reservationDate.start === '' || reservationDate.end === '') {
      alert('예약기간을 입력해주세요.');
      return;
    } else if (descriptionRef.current?.value === '') {
      alert('상세설명을 입력해주세요.');
      return;
    } else if (!tradeWay.delivery && !tradeWay.direct) {
      alert('거래방법을 선택해주세요.');
      return;
    }
    // 서버에 데이터 저장
    postData.mutate(formData);
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-center mx-auto text-b-text-black">
        <div className="mt-8 mb-6 text-3xl font-bold">빌리기</div>
        <form className="w-[800px] mx-auto">
          {/* 상품명/카테고리 section */}
          <section className="flex mb-4">
            <select
              onChange={changecategory}
              ref={categoryRef}
              className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
            >
              <option>카테고리 설정</option>
              {categorys.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              onBlur={checkWordsNumber}
              ref={productNameRef}
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명은 20자까지만 입력 가능합니다."
            />
          </section>

          {/* 사진 업로드 component */}
          <ImageUpload />

          {/* 요금 section */}
          <section className="flex items-center mb-4">
            <div className="w-[100px] p-3 text-center">요금</div>
            <input
              ref={priceDayRef}
              type="number"
              className="p-3 mx-2 w-54 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="mr-9">
              원<span className="text-[13px]"> /일</span>
            </span>
            {/* 거래방법 section */}
            <TradeWay />
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

          {/* 해시태그 section */}
          <HashTagSection />

          <section className="flex flex-col justify-center items-center">
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-5 py-2.5 mr-2 mt-3 mb-16 w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow font-medium rounded-lg text-sm text-center transition duration-100"
            >
              등록하기
            </button>
          </section>
        </form>
      </div>
      <Footer />
    </div>
  );
}
