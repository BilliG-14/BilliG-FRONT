import { Link, useNavigate } from 'react-router-dom';
import './MenuButton.css';
import billig from '../../../public/img/billig_black.svg';

const MenuButton = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div className="mt-4">
      <div className="section mt-5 relative z-0">
        <Link to="/submain/lend" className="owner">
          빌려주기
        </Link>
        <img className="house1" src="../img/h1.png" alt="house1" />
        <Link to="/submain/borrow" className="renter">
          빌리기
        </Link>
        <img className="house2" src="../img/h2.png" alt="house2" />
        <button
          className="home absolute ml-16 w-[49%] top-[-5px] z-10 transition ease-in-out hover:-translate-y--1 hover:scale-[1.1] duration-200"
          onClick={goHome}
        >
          <object data="../img/billig_black.svg" type="">
            {' '}
          </object>
        </button>
        <img className="front" src="../img/front1.png" alt="" />
        <img className="houses" src="../img/house.png" alt="vilage" />
      </div>
    </div>
  );
};

export default MenuButton;
