const GiveWriting = () => {
  // 빌려드립니다 글쓰기
  return (
    <form>
      <div className="max-w-screen-lg mx-auto">
        {/* 상품명/카테고리 section */}
        <div>
          <input
            className="p-3 mr-4 w-96 h-10 border-solid border border-gray-300 rounded-md"
            type="text"
            placeholder="상품명"
          />
          <select className="pl-3 w-40 h-10 border-solid border border-gray-300 rounded-md">
            <option>카테고리</option>
            <option>IT/가전</option>
            <option>의류</option>
            <option>캠핑/레저</option>
            <option>완구/취미</option>
            <option>도서/음반</option>
          </select>
        </div>

        {/* 사진 등록 section */}
        <div>
          <div>사진등록 아이콘</div>
          <div>사진등록시 사진 추가될 영역</div>
        </div>

        {/* 판매가격 section */}
        <div>
          <span>판매가격</span>
          <input
            type="number"
            className="p-3 mx-2 w-40 h-10 border-solid border border-gray-300 rounded-md"
          />
          원/시간
          <input
            type="number"
            className="p-3 mx-2 w-40 h-10 border-solid border border-gray-300 rounded-md"
          />
          원/일
        </div>

        {/* 상품 상세내용 section */}
        <div>
          <textarea
            placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
            className="p-3 w-2/3 h-40 border-solid border border-gray-300 rounded-md"
          />
        </div>

        <div>
          거래방법
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
          />
          직거래
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
          />
          택배거래
        </div>

        <div>해시태그</div>
      </div>
    </form>
  );
};
export default GiveWriting;
