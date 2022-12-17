import SearchItemCard from '../components/searchPage/SearchItemCard';
import Nav from '../components/nav/Nav';
import SearchBar from 'components/searchPage/SearchBar';
import HashTag from 'components/tag/HashTag';
import Footer from '../components/footer/Footer';

export default function Search() {
  return (
    <div className="w-screen max-w-screen-lg relative m-auto">
      <Nav />
      <SearchBar />
      <div>
        <div className="text-2xl font-bold py-2 px-32 mb-1">
          <span>추천 검색어</span>
        </div>
        <div className="w-3/4 h-20 m-auto border">
          <ul className="flex">
            <li>
              <HashTag />
            </li>
            <li>
              <HashTag />
            </li>
            <li>
              <HashTag />
            </li>
            <li>
              <HashTag />
            </li>
          </ul>
        </div>
      </div>
      <ul>
        <SearchItemCard />
        <SearchItemCard />
        <SearchItemCard />
        <SearchItemCard />
      </ul>
      <Footer />
    </div>
  );
}
