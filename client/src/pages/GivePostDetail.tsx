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
          <div className="text-xs text-b-text-darkgray mr-4">
            (작성일) 2022.12.16
          </div>
        </section>

        {/* 게시글 header - 기본 정보들 */}
        <section className="flex justify-between mb-4">
          <div>
            <img src="#" className="w-[410px] h-[410px]" alt="제품 사진" />
          </div>

          {/* 상품 기본정보 */}
          <div className="flex flex-col justify-between w-[350px] h-[410px] pt-3 mr-4">
            <div className="text-right">
              <div className="text-3xl">갤럭시 ZZZ 플립플립플립</div>
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
        <br />
        <section>
          <div>상세정보</div>
          <div className="w-full h-40 mt-3 p-3 rounded-lg">
            갤럭시 제트제트제트 플립플립플립입니다.
          </div>
          <br />
          <br />
          <br />
          <div>위치</div>
          <div className="w-full h-96 mt-3 rounded-lg ">지도 나타나는 곳</div>
          <br />
          <br />
          <br />
          <div>사용시 주의사항</div>
          <div className="mt-3 p-3 w-full h-84 border bg-gray-200 text-b-b-text-black rounded-lg text-xs">
            <div className="font-extrabold">[시간 엄수]</div>
            <p>
              대여 일정을 반드시 지켜주시고 부득이하게 약속을 변경해야 하는
              상황이라면 미리 연락을 취해주세요.
            </p>
            <br />
            <div className="font-extrabold">[파손 및 분실 주의]</div>
            <p>
              빌려주신 분의 소중한 물건을 조심해서 사용해 주세요. 대여 중 파손
              및 고장이 발생하거나 제품을 분실하면 오너에게 적정 비용(수리비,
              또는 아이템 중고가)을 보상하셔야 합니다.
            </p>
            <br />
            <div className="font-extrabold">[기타 주의사항]</div>
            <p>
              1) 제품이 정상적으로 작동좌는지, 그 외 다른 이상은 없는지
              빌려주시는 분과 빌리는 분이 함께 꼼꼼하게 확인한 다음 거래를
              시작하고 종료하세요. <br />
              2) 픽업 및 반납 현장에서 제품의 작동 상태나 사용 흔적 등을 동영상
              및 사진으로 기록해두세요. 분쟁 발생 시 근거 자료로 활용될 수
              있습니다. 동영상 및 사진 자료는 타임스탭프로 촬영 시점을 확인할 수
              있어야 합니다.
            </p>
          </div>
        </section>

        {/* 게시글 footer - 목록/수정/삭제 button */}
        <section className="flex justify-between my-5">
          <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100">
            목록
          </button>
          <div>
            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mr-1  transition duration-100">
              수정
            </button>
            <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100">
              삭제
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GivePostDetail;
