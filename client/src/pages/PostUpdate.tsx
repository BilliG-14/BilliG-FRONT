import { useState, ChangeEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import api from './../api/customAxios';

import {
  tradeWayStore,
  hashTagStore,
  reservationStore,
  categoryStore,
  UpdateImageUploadStore,
  descriptionStore,
} from './../store/PostWriteStore';

import HashTagSection from '../components/postWrite/HashTag';
import TradeWay from '../components/postWrite/TradeWay';
import ReservationDate from './../components/postWrite/ReservationDate';
import { PostDataType, ServerHashTags } from './../store/PostReadStore';
import Category from 'components/postWrite/Category';
import UpdatedImageUpload from 'components/postWrite/UpdatedImageUpload';
import Loading from 'components/Loading';
import Footer from 'components/footer/Footer';
import PostEditor from 'components/postWrite/PostEditor';

export default function PostUpdate() {
  const queryClient = useQueryClient();

  // 빌립니다 글쓰기
  // store에서 가져오는 state들
  const { hashTags, serverHashTags } = hashTagStore();
  const { tradeWay, setTradeWay } = tradeWayStore();
  const { reservationDate, setReservationDate } = reservationStore();
  const { filteredCategory, setFilteredCategory } = categoryStore();
  const { imgUrlList, setImgUrlList } = UpdateImageUploadStore();
  const { description, setDescription } = descriptionStore();

  const navigate = useNavigate();

  // 상품 id 가져오기
  const { id } = useParams();

  // 상품 가져오기
  const [postData, setPostData] = useState<PostDataType>();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<{ priceDay: number }>({
    priceDay: 0,
  });

  /* 서버에서 해시태그가 object 형태로 들어와서 해시태그 이름만 배열로 담아야함  */
  const serverHashTagList: string[] = [];

  const { isLoading } = useQuery(
    ['userData'],
    () => api.get(`/product/${id}`),
    {
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
        /* 서버에서 해시태그가 object 형태로 들어와서 해시태그 이름만 배열로 담아야함  */
        data?.data[0].hashtag.map((tag: ServerHashTags) =>
          serverHashTagList.push(tag.name),
        );
        serverHashTags(serverHashTagList);
        setReservationDate(
          data?.data[0].period.start,
          data?.data[0].period.end,
        );
      },
    },
  );

  // 글 업데이트
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  function changePriceDay(e: ChangeEvent<HTMLInputElement>) {
    const newPrice = { ...price, priceDay: Number(e.currentTarget?.value) };
    setPrice(newPrice);
  }

  // 제목 글자수 제한
  function checkWordsNumber(e: React.FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length > 20) {
      alert('상품명은 20자 이내로 입력 가능합니다.');
      e.currentTarget.value = e.currentTarget.value.slice(0, 20);
    }
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
        queryClient.invalidateQueries(['postData']);
      },
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  // 등록하기 클릭 시 event
  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (filteredCategory === '카테고리 설정' || title === '') {
      alert('카테고리와 이름을 입력해주세요.');
      return;
    } else if (!price.priceDay) {
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
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center mx-auto text-b-text-black">
          <div className="mt-8 mb-6 text-3xl font-bold">
            {postData?.postType === 'lend' ? '빌려주기' : '빌리기'}
          </div>
          <form className="w-[800px] mx-auto">
            {/* 상품명/카테고리 section */}
            <section className="flex mb-4">
              <Category categoryId={postData?.category._id} />
              <input
                value={title}
                onChange={changeTitle}
                onBlur={checkWordsNumber}
                id="productName"
                className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
                type="text"
                placeholder="상품명은 20자까지만 입력 가능합니다."
              />
            </section>

            {/* 사진 component */}
            <UpdatedImageUpload bringImgUrlList={imgUrlList} />

            {/* 요금 section */}
            <section className="flex items-center mb-4">
              <div className="w-[100px] p-3 text-center">요금</div>
              <input
                value={price.priceDay}
                onChange={changePriceDay}
                type="number"
                className="p-3 mx-2 w-54 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              />
              <span className="mr-9">원/일</span>
              {/* 거래방법 section */}
              <TradeWay />
            </section>

            {/* 빌리는 기간 section */}
            {postData?.postType === 'lend' ? null : <ReservationDate />}

            {/* 상품 상세내용 section */}
            <section className="mb-4">
              <PostEditor />
            </section>

            {/* 해시태그 component */}
            <HashTagSection />

            <section className="flex flex-col justify-center items-center">
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-3 mb-16 transition duration-100"
              >
                수정하기
              </button>
            </section>
          </form>
        </div>
      </div>
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
