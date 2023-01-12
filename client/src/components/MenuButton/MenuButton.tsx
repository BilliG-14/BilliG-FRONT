import { Link, useNavigate } from 'react-router-dom';
import './MenuButton.css';
import { useQueryClient } from '@tanstack/react-query';
import { darkStore } from 'store/NavStore';

const MenuButton = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const client = useQueryClient();

  const { dark } = darkStore();

  return (
    <div className="mt-4 text-black">
      <div className="section mt-5 relative z-0">
        <Link
          to="/submain"
          className="owner"
          onClick={() => {
            client.invalidateQueries(['categories']);
            client.invalidateQueries([
              'categoryLendItems/63a481d8e4222e88aa4ed713',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16ff71027a8c93f03ade6',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16ff01027a8c93f03ade4',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fe91027a8c93f03ade2',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fe01027a8c93f03ade0',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fcf1027a8c93f03addc',
            ]);
          }}
        >
          빌려주기
        </Link>
        <img className="house1" src="/img/h1.webp" alt="house1" />
        <Link
          to="/submain/borrow"
          className="renter"
          onClick={() => {
            client.invalidateQueries(['categories']);
            client.invalidateQueries([
              'categoryBorrowItems/63a16ff71027a8c93f03ade6',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a481d8e4222e88aa4ed713',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16ff01027a8c93f03ade4',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fe91027a8c93f03ade2',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fcf1027a8c93f03addc',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fe01027a8c93f03ade0',
            ]);
          }}
        >
          빌리기
        </Link>
        <img className="house2" src="/img/h2.webp" alt="house2" />
        <button
          className="home absolute ml-16 w-[49%] top-[-5px] z-10 transition ease-in-out hover:-translate-y--1 hover:scale-[1.1] duration-200"
          onClick={goHome}
        >
          <object
            data={dark ? `/img/billig_white.svg` : `/img/billig_black.svg`}
          >
            {' '}
          </object>
        </button>
        <img className="front" src="/img/front1.webp" alt="" />
        <img className="houses" src="/img/house.webp" alt="vilage" />
      </div>
    </div>
  );
};

export default MenuButton;
