import { Dispatch, SetStateAction } from 'react';
type PagingProps = {
  page?: number; //현재의 페이지
  setPage: Dispatch<SetStateAction<number>>; //변경될 페이지를 만드는 useState 함수
  totalPage?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
};

function getFirstandLast(totalPage: number, page: number) {
  //페이지가 10개 이하면 전부 다 보여줌
  if (totalPage <= 10) {
    return { firstNum: 1, lastNum: totalPage };
  }
  //모든 페이지가 11개 이상일 경우
  if (page <= 5) {
    return { firstNum: 1, lastNum: 11 };
  }
  if (page >= totalPage - 5) {
    return { firstNum: totalPage - 10, lastNum: totalPage };
  }
  return { firstNum: page - 5, lastNum: page + 5 };
}
export function Pagination({
  page = 1,
  totalPage = 10,
  setPage,
  hasPrevPage = true,
  hasNextPage = true,
}: PagingProps) {
  const { firstNum, lastNum } = getFirstandLast(totalPage, page);
  const numRange = new Array(lastNum - firstNum + 1)
    .fill(1)
    .map((_, i) => firstNum + i);
  return (
    <div className="w-full flex justify-center text-lg font-bold select-none">
      <ul className="flex">
        <li>
          <button className="w-8 h-6" onClick={() => setPage(1)}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        <li className={`${hasPrevPage ? '' : 'invisible'}`}>
          <button className="w-6 h-6" onClick={() => setPage(page - 1)}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </li>
        {numRange.map((p) => (
          <li key={p}>
            <button
              className={`w-8 h-6 mx-1 ${p === page ? 'text-b-yellow' : ''}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          </li>
        ))}
        <li className={`${hasNextPage ? '' : 'invisible'}`}>
          <button className="w-6 h-6" onClick={() => setPage(page + 1)}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </li>
        <li>
          <button onClick={() => setPage(totalPage)}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}
