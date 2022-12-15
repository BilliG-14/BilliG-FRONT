const GiveWriting = () => {
  // 빌려드립니다 글쓰기

  // file
  /*
  const selectedFiles = input.files
  */

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-5/6 flex flex-col justify-center mx-auto text-b-text-black">
        <div className="h-80">header</div>
        <div className="mb-6 text-3xl">빌려드립니다</div>
        <form>
          {/* 상품명/카테고리 section */}
          <section className="flex mb-4">
            <select className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2">
              <option>카테고리</option>
              <option>IT/가전</option>
              <option>의류</option>
              <option>캠핑/레저</option>
              <option>완구/취미</option>
              <option>도서/음반</option>
            </select>
            <input
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명"
              required
            />
          </section>

          {/* 사진 등록 section */}
          <section className="mb-4">
            <input
              type="file"
              accept="image/jpeg,"
              multiple
              required
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              cursor-pointer
              file:bg-b-bg-gray file:text-b-text-black
              hover:file:bg-gray-200
              file:cursor-pointer"
            />
            <div>사진등록시 사진 추가될 영역</div>
          </section>

          {/* 판매가격 section */}
          <section className="mb-4">
            <span className="mr-5">판매가격</span>
            <input
              type="number"
              className="appearance: none p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              style={{ WebkitAppearance: 'none' }}
            />
            <span className="mr-5">원/시간</span>
            <input
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
              className="p-3 w-full h-40 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              required
            />
          </section>

          {/* 거래방법 section */}
          <section className="mb-4 h-10 flex items-center">
            <span className="mr-5 ">거래방법</span>
            <input
              type="checkbox"
              className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
            />
            <span className="mr-7">직거래</span>
            <input
              type="checkbox"
              className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
            />
            <span>택배거래</span>
          </section>

          {/* 해시태그 section */}
          <section className="mb-4 h-10 flex items-center">
            <span className="mr-5">해시태그</span>
            <div>
              <input
                type="text"
                placeholder="태그를 입력해주세요"
                className="p-3 mr-4 w-40 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              />
            </div>
            <div> 해시태그 생기는 부분 </div>
          </section>
          <section className="flex flex-col justify-center items-center">
            <button className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              등록하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};
export default GiveWriting;
