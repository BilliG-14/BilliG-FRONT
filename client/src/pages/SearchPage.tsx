import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/customAxios';
// components
import SearchItemCard from '../components/searchPage/SearchItemCard';
import HashTag from 'components/tag/HashTag';
import SearchItemCardSeleton from 'components/searchPage/SearchItemCard-skeleton';
// icon
import { FiSearch } from 'react-icons/fi';
import { Pagination } from '../components/Pagination';
import Loading from 'components/Loading';
// type
import { PostDataType } from 'types/productType';
import { HashtagType } from 'types/hashtagType';

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [pagination, setPagination] = useState({
    totalPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [items, setItems] = useState([]);
  const [radioStatus, setRadioStatus] = useState('lend');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchWord) return;
    setLoading(true);
    try {
      const searchItems = await api.get(
        `/product/page?postType=${radioStatus}&per=10&page=1&hashtag=${searchWord}`,
      );

      const { hasNextPage, hasPrevPage } = searchItems.data;
      setItems(searchItems.data.docs);
      setPagination({
        totalPage: searchItems.data.totalPages,
        hasNextPage,
        hasPrevPage,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data: hashtags } = useQuery(
    ['hashtags'],
    async () => {
      return api.get(`/hashtag/popular?products=50&hashtags=10`);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  );
  if (isLoading) return <Loading />;
  return (
    <div className="w-screen max-w-screen-lg relative m-auto">
      {/* radio btn */}
      <form className="flex text-xl font-bold py-2 px-32 mb-1">
        <div className="mr-3">
          <input
            id="lend"
            name="lend"
            type="radio"
            checked={radioStatus === 'lend'}
            onChange={() => {
              setRadioStatus('lend');
              setItems([]);
            }}
            className="mr-1"
          ></input>
          <label htmlFor="lend">빌려주기</label>
        </div>
        <div>
          <input
            id="borrow"
            name="borrow"
            type="radio"
            checked={radioStatus === 'borrow'}
            onChange={() => {
              setRadioStatus('borrow');
              setItems([]);
            }}
            className="mr-1"
          ></input>
          <label htmlFor="lend">빌리기</label>
        </div>
      </form>
      {/* Searchbar */}
      <form
        action="submit"
        className="w-full flex justify-center mb-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="searchWord"
          onChange={(e) => {
            setSearchWord(e.currentTarget.value);
          }}
          placeholder="검색어를 입력해주세요..."
          className="w-full text-xl max-w-3xl border-b border-solid border-b-yellow px-4 py-3 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute p-2 text-4xl right-32 text-b-yellow hover: ease-in-out duration-300"
        >
          <FiSearch />
        </button>
      </form>
      {/* hashTags */}
      <section className="hashtag_section">
        <div className="text-2xl font-bold py-2 px-32 mb-1">
          <span>추천 검색어</span>
        </div>
        <div className="w-3/4 h-20 m-auto border">
          <ul className="flex">
            {hashtags?.data.map((tag: HashtagType) => (
              <li key={tag._id}>
                <HashTag name={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* ItemCard section*/}
      <section className="itemcard_section">
        {items.length > 0 && (
          <div>
            <div className="text-2xl font-bold py-2 px-32 mb-1">
              {radioStatus === 'lend' ? (
                <span>빌려주기 게시물</span>
              ) : (
                <span>빌리기 게시물</span>
              )}
            </div>
          </div>
        )}
        <ul>
          {loading && (
            <ul>
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
              <SearchItemCardSeleton />
            </ul>
          )}
          {items.length > 0 ? (
            items.map((item: PostDataType) => (
              <SearchItemCard key={item._id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-xl font-bold">
              <p>원하는 상품을 검색해보세요.</p>
            </div>
          )}
        </ul>
        {items.length > 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={pagination.totalPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
          />
        )}
      </section>
    </div>
  );
}
