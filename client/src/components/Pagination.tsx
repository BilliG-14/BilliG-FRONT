import { Dispatch, SetStateAction, useCallback } from 'react';
type PagingProps = {
  page?: number; //현재의 페이지
  setPage: Dispatch<SetStateAction<number>>; //변경될 페이지를 만드는 useState 함수
  totalPage?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
};

export function Pagination({
  page = 1,
  totalPage = 10,
  setPage,
  hasPrevPage = true,
  hasNextPage = true,
}: PagingProps) {
  const currPageStyle = useCallback(
    (index: number) => {
      if (page === index + 1)
        return 'border-solid border-2 border-b-yellow text-b-yellow ';
      return '';
    },
    [page],
  );
  return (
    <div className="w-full flex justify-center text-lg font-bold">
      <ul className="flex">
        <li>
          <button className="w-8 h-6" onClick={() => setPage(1)}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </li>
        {hasPrevPage && (
          <li>
            <button className="ml-1 w-6 h-6" onClick={() => setPage(page - 1)}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </li>
        )}
        {Array(totalPage)
          .fill(1)
          .map((_, index) => {
            return (
              <li key={index + 1}>
                <button className="w-6 h-6" onClick={() => setPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            );
          })}
        {hasNextPage && (
          <li>
            <button className="mr-1 w-6 h-6" onClick={() => setPage(page + 1)}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </li>
        )}
        <li>
          <button onClick={() => setPage(totalPage)}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}
