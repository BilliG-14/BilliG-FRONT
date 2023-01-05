import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from './../api/customAxios';

import {
  imageUploadStore,
  tradeWayStore,
  hashTagStore,
  CategoryType,
  descriptionStore,
} from './../store/PostWriteStore';
import { getUserInformation } from './../api/product-api';

import HashTagSection from '../components/postWrite/HashTag';
import ImageUpload from '../components/postWrite/ImageUpload';
import TradeWay from '../components/postWrite/TradeWay';
import Loading from 'components/Loading';
import Footer from 'components/footer/Footer';
import PostEditor from 'components/postWrite/PostEditor';
import ChatIcon from './../components/chat-icon/ChatIcon';
import { getCategories } from 'api/category-api';

export default function LendWriting() {
  // 빌려드립니다 글쓰기
  // store에서 가져오는 state들
  const { hashTags } = hashTagStore();
  const { imgFiles } = imageUploadStore();
  const { tradeWay } = tradeWayStore();
  const { description } = descriptionStore();

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDayRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  // 사용자 가져오기
  const { data, isLoading } = useQuery(
    ['userData'],
    () => getUserInformation(),
    {
      onError: () => {
        navigate('/login');
      },
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );

  // 카테고리 가져오기
  const [filteredCategory, setFilteredCategory] = useState<CategoryType[]>([]);

  // 카테고리 받아오기
  const { data: categories } = useQuery(['categories'], getCategories, {
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 60,
  });

  // 사용자가 선택한 카테고리만 필터
  function changecategory() {
    setFilteredCategory(
      categories.filter(
        (category: { _id: string; name: string }) =>
          category._id === categoryRef.current?.value,
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
      onError: (err) => {
        alert(`게시글을 등록하는 도중 오류가 생겼습니다. \n에러내용: ${err}`);
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
    postType: 'lend',
    category: filteredCategory[0]?._id,
    author: data?.data?._id,
    lender: data?.data?._id,
    title: productNameRef.current?.value,
    description: description,
    stateOfTransaction: 0,
    address: data?.data?.address1,
    price: {
      priceDay: Number(priceDayRef.current?.value),
    },
    tradeWay: tradeWay,
    hashtag: hashTags,
    period: {
      start: '',
      end: '',
    },
  };
  formData.append('data', JSON.stringify(writeData));

  // 등록하기 클릭 시 event
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (filteredCategory.length === 0 || productNameRef.current?.value === '') {
      alert('카테고리와 이름을 입력해주세요.');
      return;
    } else if (imgFiles.length === 0) {
      alert('상품 사진을 등록해주세요. 3장까지 등록가능합니다.');
      return;
    } else if (
      !priceDayRef.current?.value ||
      priceDayRef.current?.value === '0'
    ) {
      alert('요금을 입력해주세요.');
      return;
    } else if (description === '') {
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
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center mx-auto text-b-text-black">
          <div className="mt-8 mb-6 text-3xl font-bold">빌려주기</div>
          <form className="w-[800px] mx-auto">
            {/* 상품명/카테고리 section */}
            <section className="flex mb-4">
              <select
                onChange={changecategory}
                ref={categoryRef}
                className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
              >
                <option>카테고리 설정</option>
                {categories.map((category: { _id: string; name: string }) => (
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

            {/* 사진 등록 section */}
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

            {/* 상품 상세내용 section */}
            <section className="mb-4">
              <PostEditor />
            </section>

            {/* 해시태그 section */}
            <HashTagSection />

            <section className="flex flex-col justify-center items-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-3 mb-16 transition duration-100"
              >
                등록하기
              </button>
            </section>
          </form>
        </div>
      </div>
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
        <ChatIcon />
      </div>
    </div>
  );
}
