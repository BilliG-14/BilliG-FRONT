const GivePostDetail = () => {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-[800px] flex flex-col justify-center mx-auto text-b-text-black">
        <div className="h-80">header</div>
        <div className="mb-6 text-3xl">빌리기</div>
        {/* 상단 정보(카테고리, 작성일) */}
        <section className="max-w-screen-lg flex justify-between mb-4">
          <div className="text-sm text-b-text-darkgray ml-4">
            빌려주기 {'>'} 생활용품
          </div>
          <div className="text-sm text-b-text-darkgray mr-4">
            (작성일) 2022.12.16
          </div>
        </section>

        {/* 게시글 header - 기본 정보들 */}
        <section className="flex justify-between mb-4">
          <div>
            <img src="#" className="w-[410px] h-[410px]" />
          </div>

          {/* 상품 기본정보 */}
          <div className="flex flex-col justify-between w-[350px] h-[410px] pt-3 mr-4">
            <div className="text-right">
              <div className="text-3xl">상품명</div>
              <div className="text-sm mt-1">해시태그</div>
            </div>

            <div className="text-right">
              <div className="mb-2">
                <div className="mb-2">1,000원/시간</div>
                <div>5,000원/일</div>
              </div>

              {/* 사용자 정보 */}
              <div className="flex flex-col items-end mt-6">
                <div className="w-[290px] p-2.5 text-right bg-white border border-solid border-gray-300 rounded-lg">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                      alt="사용자 이미지"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        닉네임
                      </p>
                      <p className="text-xs font-medium text-gray-400 truncate">
                        서울시 엘리스구 프로젝트동
                      </p>
                    </div>
                  </div>
                </div>

                {/* 채팅버튼 */}
                <button className="mt-2 w-[290px] focus:outline-none bg-b-bg-gray hover:bg-b-yellow hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
                  채팅하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 게시글 main - 상세 정보들 */}
        <section>
          <div>상세정보</div>
          <div>상세정보 불러온 data</div>
          <div>위치</div>
          <div>지도</div>
          <div>사용시 주의사항</div>
          <div>주의사항 section</div>
        </section>

        {/* 게시글 footer - 목록/수정/삭제 button */}
        <section className="flex mb-4">
          <button>목록</button>
          <div>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GivePostDetail;
