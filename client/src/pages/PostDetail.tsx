import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Caution from '../components/postDetail/Caution';
import { PostDataType } from '../store/PostReadStore';
// import TradeWayTag from '../components/tag/TradeWayTag';
import { FaPeopleArrows } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';
import api from './../api/customAxios';
import DealDoneModal from '../components/postDetail/DealDoneModal';
import { ProductReceiveButton } from '../components/postDetail/ProductReceiveModal';
import { ProductReturnedModal } from '../components/postDetail/ProductReturnedModal';

export default function PostDetail() {
  const navigate = useNavigate();

  // 현재 로그인 유저의 정보 가져오기
  const LoginUserId = localStorage.getItem('userId');

  // 서버에서 get 하는 data state
  const [postData, setPostData] = useState<PostDataType>();

  // url id 받기
  const { id } = useParams();

  useQuery(['postData'], () => api.get(`product/${id}`), {
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    onSuccess: (res) => setPostData(res?.data[0]),
    onError: () => console.log('error'),
  });

  // post 삭제하기, useMutate 정의
  const deleteData = useMutation(() => api.delete(`/product/${id}`), {
    onSuccess: () => {
      navigate('/submain');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 현재 상품 상태가 거래전(대여전)상태일때만 삭제가 가능하게끔함.
  // 프로세스 : 거래전(0) - 거래중(1) - 대여완료(2) - 반납완료(3)
  function deletePost() {
    console.log(postData?.stateOfTransaction === 0);
    if (postData?.stateOfTransaction === 0) {
      deleteData.mutate();
    } else {
      alert(
        '현재 거래 상태에서는 글을 삭제할 수 없습니다. \n관리자에게 문의하세요.',
      );
      return;
    }
  }

  // 서브 사진 클릭하면 메인으로 올리기
  const [mainImgUrl, setMainImgUrl] = useState('');

  function changeMainImg(e: React.MouseEvent<HTMLImageElement>) {
    setMainImgUrl(e.currentTarget.src);
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col justify-center mx-auto text-b-text-black">
        <div className="mb-6 text-3xl">
          {postData?.postType === 'lend' ? '빌려주기' : '빌리기'}
        </div>
        {!postData ? (
          <div className="h-[500px] text-center text-sm mt-10">
            잘못된 페이지이거나 삭제된 게시글입니다.
          </div>
        ) : (
          <>
            {/* 상단 정보(카테고리, 작성일) */}
            <section className="max-w-screen-lg flex justify-between mb-4">
              <div className="text-sm text-b-text-darkgray ml-4">
                {postData?.postType === 'lend' ? '빌려주기' : '빌리기'} {'>'}{' '}
                {postData?.category.name}
              </div>
              <div className="text-xs text-b-text-darkgray mr-4">
                작성시간{' '}
                {postData?.createdAt.split('T')[0] +
                  ' ' +
                  postData?.createdAt.split('T')[1].slice(0, 8)}
              </div>
            </section>

            {/* 게시글 header - 기본 정보들 */}
            <section className="flex justify-between mb-4 ">
              <div>
                <img
                  src={
                    !postData?.imgUrl[0]
                      ? '../../product_default.png'
                      : mainImgUrl === ''
                      ? postData?.imgUrl[0]
                      : mainImgUrl
                  }
                  className="w-[410px] h-[410px]"
                  alt="메인 사진"
                />
                <div className="flex justify-center gap-1">
                  {postData?.imgUrl.map((url, idx) => (
                    <img
                      onMouseOver={changeMainImg}
                      key={idx}
                      src={url}
                      className="w-16 h-16 mt-2 border border-solid border-gray-300"
                      alt="원하는 제품 사진"
                    />
                  ))}
                </div>
              </div>

              {/* 상품 기본정보 */}
              <div className="flex flex-col justify-between w-[450px] h-[410px] pt-3 mr-4">
                <div className="text-right">
                  <div className="text-3xl">{postData?.title}</div>
                  <div className="flex justify-end">
                    {postData?.hashtag.map((tag, idx) => {
                      return (
                        <div
                          key={idx}
                          className="text-[10px] mt-2 mr-1 p-1.5 bg-gray-200 rounded-lg"
                        >
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-b-text-darkgray w-24 mb-2 text-left">
                      요금
                    </div>
                    <div>
                      <div className="mb-2">
                        {postData?.price.priceTime}원/시간
                      </div>
                      <div>{postData?.price.priceDay}/일</div>
                    </div>
                  </div>
                  <hr className="hr-1 my-4"></hr>
                  {postData?.postType === 'lend' ? null : (
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-b-text-darkgray w-24 mb-2 text-left my-auto">
                        대여시간
                      </div>
                      <div>
                        <div>
                          {postData?.period?.start} ~ {postData?.period?.end}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 대여방법 */}
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-b-text-darkgray w-24 mb-2 text-left my-auto">
                      대여방법
                    </div>
                    <div>
                      {/* <TradeWayTag tradeWay={borrowData?.tradeWay} /> */}
                      <div
                        className={`${
                          postData?.tradeWay.direct ? 'bg-b-tag-dir' : ''
                        } item_tag inline-flex text-b-hash-text p-[5px] rounded-lg font-extrabold my-auto mr-2`}
                      >
                        {postData?.tradeWay.direct ? (
                          <FaPeopleArrows className="mr-1 text-sm" />
                        ) : (
                          ''
                        )}

                        <span className="text-xs">
                          {postData?.tradeWay.direct ? '직거래' : ''}
                        </span>
                      </div>
                      <div
                        className={`${
                          postData?.tradeWay.delivery ? 'bg-b-tag-pack' : ''
                        } item_tag inline-flex text-b-hash-text p-[5px] rounded-lg font-extrabold my-auto`}
                      >
                        {postData?.tradeWay.delivery ? (
                          <GoPackage className="mr-1 text-sm" />
                        ) : (
                          ''
                        )}

                        <span className="text-xs">
                          {postData?.tradeWay.delivery ? '택배거래' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 사용자 정보 */}
                  <div className="flex flex-row gap-2 items-end mt-6">
                    <div className="w-1/2 p-2 text-left bg-white border border-solid border-gray-300 rounded-lg">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 mr-2 rounded-full"
                          src={postData?.author.image}
                          alt="사용자 이미지"
                        />

                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-gray-900 mb-1">
                            {postData?.author.nickName}
                          </p>
                          <p className="text-[8px] font-medium text-gray-400 ">
                            {postData?.author.address1}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 채팅버튼 혹은 상태에 따라서 버튼 달라짐 */}
                    {LoginUserId === postData?.author?._id ? (
                      postData.stateOfTransaction === 0 ? (
                        <DealDoneModal
                          id={id}
                          stateNumber={postData.stateOfTransaction}
                        />
                      ) : postData.stateOfTransaction === 3 ? (
                        <ProductReturnedModal
                          id={id}
                          stateNumber={postData.stateOfTransaction}
                        />
                      ) : (
                        <ProductReturnedModal
                          id={id}
                          stateNumber={postData.stateOfTransaction}
                        />
                      )
                    ) : LoginUserId === postData?.lender?._id ? (
                      <ProductReceiveButton
                        id={id}
                        stateNumber={postData.stateOfTransaction}
                      />
                    ) : postData.stateOfTransaction === 3 ? (
                      <button
                        disabled
                        className="w-1/2 h-[50px] focus:outline-none disabled:bg-gray-300 text-white  disabled:text-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
                      >
                        거래종료
                      </button>
                    ) : postData.stateOfTransaction !== 0 ? (
                      <button
                        disabled
                        className="w-1/2 h-[50px] focus:outline-none disabled:bg-gray-300 text-white  disabled:text-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
                      >
                        거래중
                      </button>
                    ) : (
                      <button className="w-1/2 h-[50px] focus:outline-none bg-b-bg-gray hover:bg-b-yellow hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
                        채팅하기
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 게시글 main - 상세 정보들 */}
            <br />
            <section>
              <div>상세정보</div>
              <div className="w-full h-40 mt-3 p-3 rounded-lg">
                {postData?.description}
              </div>
              <br />
              <br />
              <br />
              <div>위치</div>
              <div className="w-full h-96 mt-3 rounded-lg ">
                지도 나타나는 곳
              </div>
              <br />
              <br />
              <br />
              <Caution />
            </section>

            {/* 게시글 footer - 목록/수정/삭제 button */}
            <section className="flex justify-between my-5">
              <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100">
                목록
              </button>
              {LoginUserId === postData?.author._id ? (
                <div>
                  <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mr-1  transition duration-100">
                    수정
                  </button>
                  <button
                    onClick={deletePost}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100"
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
