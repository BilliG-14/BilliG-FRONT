import { useRef, useState, MouseEvent } from 'react';

export default function BorrowWriting() {
  // 빌립니다 글쓰기
  const today: string = new Date()
    .toLocaleDateString()
    .replace(/\./g, '')
    .replace(/\s/g, '-');

  // Ref
  const productNameRef = useRef<HTMLInputElement>(null);
  const priceDay = useRef<HTMLInputElement>(null);
  const priceTime = useRef<HTMLInputElement>(null);
  const period = useRef<HTMLInputElement>(null);
  const picture = useRef<HTMLInputElement>(null);

  // 버튼 클릭 시
  function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // console.log(productNameRef.current?.value);
    // console.log(priceDay.current?.value);
    // console.log(priceTime.current?.value);
    // console.log(typeof period.current?.value);
    console.log(typeof file);
  }

  // 업로드할 파일들을 담을 State!
  const [file, setFile] = useState<File>();

  /**
   * 파일 선택 onChangeHandler
   * 해당 method에서는 업로드할 파일에대해서 validaion을 하고
   * file state에 값을 할당한다
   */

  function fileUploadValidHandler(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    // validation을 정상적으로 통과한 File
    setFile(files);
    console.log(target.files as FileList);
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-[800px] flex flex-col justify-center mx-auto text-b-text-black">
        <div className="h-80">header</div>
        <div className="mb-6 text-3xl">빌리기</div>
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
              ref={productNameRef}
              id="productName"
              className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
              type="text"
              placeholder="상품명"
            />
          </section>

          {/* 사진 등록 section */}
          <section className="mb-4">
            <input
              onClick={fileUploadValidHandler}
              ref={picture}
              type="file"
              accept="image/jpeg,"
              multiple
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

          {/* 요금 section */}
          <section className="flex items-center mb-4">
            <div className="w-[100px] p-3 text-center">요금</div>
            <input
              ref={priceTime}
              type="number"
              className="appearance: none p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div className="mr-5">원/시간</div>
            <input
              ref={priceDay}
              type="number"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <span className="">원/일</span>
          </section>

          {/* 빌리는 기간 section */}
          <section className="mb-4 flex items-center">
            <div className="w-[100px] p-3 text-center">예약기간</div>
            <input
              ref={period}
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
            <div>~</div>
            <input
              type="date"
              min={today}
              max="2099-12-31"
              className="p-3 mx-2 w-60 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 상품 상세내용 section */}
          <section className="mb-4">
            <textarea
              placeholder="사이즈, 색상 등 상세정보를 입력하면 좋아요!"
              className="p-3 w-full h-40 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </section>

          {/* 거래방법 section */}
          <section className="mb-4 h-10 flex items-center">
            <span className="w-[100px] p-3 text-center">거래방법</span>
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
            <span className="w-[100px] p-3 text-center">해시태그</span>
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
            <button
              onClick={handleButtonClick}
              className="w-1/6 h-10 hover:text-white border border-b-yellow hover:bg-b-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              등록하기
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
