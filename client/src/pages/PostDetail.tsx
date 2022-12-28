import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import Caution from '../components/postDetail/Caution';
import { PostDataType } from '../store/PostReadStore';
// import TradeWayTag from '../components/tag/TradeWayTag';
import { FaPeopleArrows } from 'react-icons/fa';
import { GoPackage } from 'react-icons/go';
import { MdLocationOn } from 'react-icons/md';
import api from './../api/customAxios';
import LendButtons from '../components/postDetail/LendButtons';
import BorrowButtons from '../components/postDetail/BorrowButtons';
import Map from 'components/postDetail/Map';
import Loading from 'components/Loading';
import { AxiosError } from 'axios';
import NotFound from 'components/NotFound';
import Footer from 'components/footer/Footer';
import ChatIcon from 'components/chat-icon/ChatIcon';

export default function PostDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 현재 로그인 유저의 정보 가져오기
  const LoginUserId = localStorage.getItem('userId');

  // 서브 사진 클릭하면 메인으로 올리는 state
  const [mainImgUrl, setMainImgUrl] = useState('');

  // url id 받기
  const { id } = useParams();

  const {
    isLoading,
    data: postDatas,
    isError,
  } = useQuery<PostDataType[], AxiosError>(
    ['postData', id],
    async () => {
      const res = await api.get(`/product/${id}`);
      return res.data;
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  );

  // post 삭제하기, useMutate 정의
  const deleteData = useMutation(() => api.delete(`/product/${id}`), {
    onSuccess: () => {
      navigate('/submain');
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFound />;
  }

  const postData = postDatas[0];

  // 현재 상품 상태가 거래전(대여전)상태일때만 수정/삭제가 가능함.
  // 프로세스 : 거래전(0) - 거래중(1) - 대여완료(2) - 반납완료(3)
  function editPost() {
    if (postData?.stateOfTransaction !== 0) {
      alert(
        '현재 거래 상태에서는 글을 수정할 수 없습니다. \n관리자에게 문의하세요.',
      );
      return;
    }
    navigate(`/update/${id}`);
  }

  function deletePost() {
    if (postData?.stateOfTransaction === 0) {
      const answer = window.confirm(
        '삭제된 글은 복구할 수 없습니다. \n게시물을 삭제하시겠습니까?',
      );
      if (answer) {
        deleteData.mutate();
      }
    } else {
      alert(
        '현재 거래 상태에서는 글을 삭제할 수 없습니다. \n관리자에게 문의하세요.',
      );
      return;
    }
  }

  // 서브 사진 클릭하면 메인으로 올리기
  function changeMainImg(e: React.MouseEvent<HTMLImageElement>) {
    setMainImgUrl(e.currentTarget.src);
  }
  return (
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col justify-center mx-auto text-b-text-black">
          <div className="mt-8 mb-6 text-3xl font-bold">
            {postData?.postType === 'lend' ? (
              <Link to="/submain">빌려주기</Link>
            ) : (
              <Link to="/submain/borrow">빌리기</Link>
            )}
          </div>
          {!postData ? (
            <div className="h-[500px] text-center text-sm mt-10">
              잘못된 페이지이거나 삭제된 게시글입니다.
              <br />
              <button className="mt-6 py-1.5 px-3 font-bold bg-slate-300 hover:bg-slate-400 rounded transition duration-100">
                메인 페이지로 이동
              </button>
            </div>
          ) : (
            <>
              {/* 상단 정보(카테고리, 작성일) */}
              <section className="max-w-screen-lg flex justify-between mb-4">
                <div className="text-sm text-b-text-darkgray ml-4">
                  {postData?.postType === 'lend' ? (
                    <Link to="/submain">빌려주기</Link>
                  ) : (
                    <Link to="/submain/borrow">빌리기</Link>
                  )}{' '}
                  {'>'}{' '}
                  {postData?.postType === 'lend' ? (
                    <Link to={`/products/lend/${postData?.category._id}`}>
                      {postData?.category.name}
                    </Link>
                  ) : (
                    <Link to={`/products/borrow/${postData?.category?._id}`}>
                      {postData?.category.name}
                    </Link>
                  )}
                </div>
                <div className="text-xs text-b-text-darkgray mr-4">
                  작성시간{' '}
                  {postData?.createdAt.split('T')[0] +
                    ' ' +
                    postData?.createdAt.split('T')[1].slice(0, 8)}
                  <br />
                  수정시간{' '}
                  {postData?.updatedAt.split('T')[0] +
                    ' ' +
                    postData?.updatedAt.split('T')[1].slice(0, 8)}
                </div>
              </section>

              {/* 게시글 header - 기본 정보들 */}
              <section className="flex justify-around my-4">
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
                        className="w-16 h-16 mt-3 border border-solid border-gray-300"
                        alt="원하는 제품 사진"
                      />
                    ))}
                  </div>
                </div>

                {/* 상품 기본정보 */}
                <div className="flex flex-col justify-between w-[450px] h-[410px] pt-3 mr-4">
                  <div className="text-left">
                    <div className="text-3xl font-bold">{postData?.title}</div>
                    <div className="flex">
                      {postData?.hashtag.map((tag, idx) => {
                        return (
                          <div
                            key={idx}
                            className="text-[10px] mt-2 mr-1 p-1.5 bg-gray-200 rounded-lg"
                          >
                            {tag.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-b-text-darkgray w-24 text-left">
                        요금
                      </div>
                      <div className="flex items-end align-bottom">
                        <div className="text-lg leading-none font-semibold">
                          {postData?.price.priceDay.toLocaleString()} 원
                        </div>
                        <div className="text-[14px]">&nbsp;/ 일</div>
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
                            postData?.tradeWay.direct ? 'bg-b-tag-dir' : null
                          } item_tag inline-flex text-b-hash-text p-[5px] rounded-lg font-extrabold my-auto`}
                        >
                          {postData?.tradeWay.direct ? (
                            <FaPeopleArrows className="mr-1 text-sm" />
                          ) : (
                            ''
                          )}

                          <span className="text-xs">
                            {postData?.tradeWay.direct ? '직거래' : null}
                          </span>
                        </div>
                        <div
                          className={`${
                            postData?.tradeWay.delivery
                              ? 'bg-b-tag-pack item_tag inline-flex text-b-hash-text p-[5px] rounded-lg font-extrabold my-auto ml-2'
                              : null
                          }`}
                        >
                          {postData?.tradeWay.delivery ? (
                            <GoPackage className="mr-1 text-sm" />
                          ) : (
                            ''
                          )}

                          <span className="text-xs">
                            {postData?.tradeWay.delivery ? '택배거래' : null}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 사용자 정보 */}
                    <div className="flex flex-row gap-2 items-end mt-6">
                      <Link
                        to={`/user/${postData?.author?._id}`}
                        className="w-1/2 p-2 text-left bg-white border border-solid border-gray-300 rounded-lg"
                      >
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 mr-2 rounded-full"
                            src={
                              postData?.author.image === ''
                                ? '../img/default_user.png'
                                : postData?.author.image
                            }
                            alt="사용자 이미지"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-[600] text-gray-900 mb-1">
                              {postData?.author.nickName}
                            </p>
                            <p className="text-[8px] font-medium text-gray-400 ">
                              {postData?.author.address1.length > 23
                                ? `${postData?.author.address1.slice(0, 22)}...`
                                : postData?.author.address1}
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* 채팅버튼 혹은 상태에 따라서 버튼 달라짐 */}
                      {postData?.postType === 'lend' ? (
                        <LendButtons
                          postType={postData?.postType}
                          loginedUserId={LoginUserId}
                          postId={id}
                          authorId={postData?.author?._id}
                          borrowerId={postData?.borrower?._id}
                          stateNumber={postData.stateOfTransaction}
                        />
                      ) : (
                        <BorrowButtons
                          postType={postData?.postType}
                          loginedUserId={LoginUserId}
                          postId={id}
                          authorId={postData?.author?._id}
                          lenderId={postData?.lender?._id}
                          stateNumber={postData.stateOfTransaction}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* 게시글 main - 상세 정보들 */}
              <br />
              <section>
                <div className="font-semibold text-lg">상세정보</div>
                <DetailDiv
                  className="w-full min-h-[300px] h-auto mt-3 mb-12 p-3 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: postData?.description }}
                />
                <div className="flex items-end gap-7">
                  <div className="font-semibold text-lg leading-none">위치</div>
                  <div className="flex text-sm leading-none items-end">
                    <MdLocationOn className="w-5 h-5 mr-1 text-b-yellow" />
                    {postData?.author.address1}
                  </div>
                </div>
                <div className="my-3 p-3">
                  <Map address={postData?.author.address1} />
                </div>
                <Caution />
              </section>

              {/* 게시글 footer - 목록/수정/삭제 button (게시글의 작성자일때만 수정/삭제 버튼이 보임) */}
              <section className="flex justify-between mt-5 my-9">
                <Link
                  to={
                    postData?.postType === 'lend'
                      ? '/submain'
                      : '/submain/borrow'
                  }
                >
                  <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100">
                    목록
                  </button>
                </Link>
                {LoginUserId === postData?.author._id ? (
                  <div>
                    <button
                      onClick={editPost}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mr-1  transition duration-100"
                    >
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
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <ChatIcon />
        <Footer />
      </div>
    </div>
  );
}

const DetailDiv = styled.div`
  line-height: 0.8;
  & h1 {
    font-size: 2em;
    font-weight: bolder;
    line-height: 1;
  }
  & h2 {
    font-size: 1.5em;
    font-weight: bolder;
    line-height: 1;
  }
  & h3 {
    font-size: 1.17em;
    font-weight: bolder;
    line-height: 1;
  }
  & h4 {
    font-size: 1em;
    font-weight: bolder;
    line-height: 1;
  }
  & h5 {
    font-size: 0.83em;
    font-weight: bolder;
    line-height: 1;
  }
  & h6 {
    font-size: 0.67em;
    font-weight: bolder;
    line-height: 1;
  }
  & strong {
    font-weight: bold;
  }
  & p {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    line-height: 1;
  }
  em {
    font-style: italic;
  }
  li {
    display: list-item;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-top: 1em;
    margin-bottom: 1 em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
  a:link,
  a:visited {
    color: (internal value);
    text-decoration: underline;
    cursor: auto;
  }
  a:link:active,
  a:visited:active {
    color: (internal value);
  }
`;
