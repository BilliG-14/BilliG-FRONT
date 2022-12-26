import SearchItemCard from '../components/searchPage/SearchItemCard';
import Nav from '../components/nav/Nav';
// import SearchBar from 'components/searchPage/SearchBar';
import HashTag from 'components/tag/HashTag';
import Footer from '../components/footer/Footer';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from '../components/nav/TrueNav';
import { useQuery } from '@tanstack/react-query';
import api from '../api/customAxios';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { Item } from 'components/myinfo/MyLendPostList';
import SearchItemCardSeleton from 'components/searchPage/SearchItemCard-skeleton';

export default function Search() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [items, setItems] = useState([]);
  const { isLogin } = useIsLoginStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchItems = await api.get(
      `/product/page?per=10&page=1&hashtag=${searchWord}`,
    );
    setItems(searchItems.data.docs);
  };

  const { isLoading, data: hashtags } = useQuery(
    ['hashtags'],
    async () => {
      return api.get(`/hashtag/popular?products=50&hashtags=10`);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  if (isLoading) return <p>Loading...</p>;
  console.log(items);
  return (
    <div className="w-screen max-w-screen-lg relative m-auto">
      {isLogin ? <TrueNav /> : <Nav />}
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
      <div>
        <div className="text-2xl font-bold py-2 px-32 mb-1">
          <span>추천 검색어</span>
        </div>
        {/* hashTags */}
        <div className="w-3/4 h-20 m-auto border">
          <ul className="flex">
            {hashtags?.data.map((tag: Tag) => (
              <li key={tag._id}>
                <HashTag name={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ItemCard */}
      <ul>
        {items.length > 0 ? (
          items.map((item: Item) => (
            <SearchItemCard key={item._id} item={item} />
          ))
        ) : (
          <ul>
            <SearchItemCardSeleton />
            <SearchItemCardSeleton />
            <SearchItemCardSeleton />
          </ul>
        )}
      </ul>
      <Footer />
    </div>
  );
}

type Tag = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  mentions: number;
  recentMentions: number;
  name: string;
};
