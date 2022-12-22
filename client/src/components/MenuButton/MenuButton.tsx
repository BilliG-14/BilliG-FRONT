import { Link, useNavigate } from 'react-router-dom';
import './MenuButton.css';
// import img from '../../../public/h1.png';

const MenuButton = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div>
      {/* <button
        className="home absolute ml-16 top-[35px] z-10 hover:text-b-yellow hover: ease-in-out duration-300"
        onClick={goHome}
      >
        <h1 className="font-extrabold text-5xl">B illi G</h1>
      </button> */}
      {/* <div className="w-[250px] h-[100px] relative">
        <Link to="/" className="owner">
          빌려주기
        </Link>
        <img className="house1 hidden" src="../../h1.png" alt="house1" />
        <Link to="/" className="renter">
          빌리기
        </Link>
        <img className="house2 hidden" src="../../h2.png" alt="house2" />
      </div> */}
      <div className="section mt-5 relative z-0">
        <Link to="/write/lend" className="owner">
          빌려주기
        </Link>
        <img className="house1" src="../../h1.png" alt="house1" />
        <Link to="/write/borrow" className="renter">
          빌리기
        </Link>
        <img className="house2" src="../../h2.png" alt="house2" />
        <button
          className="home absolute ml-16 top-[10px] z-10 hover:text-b-yellow hover: ease-in-out duration-300"
          onClick={goHome}
        >
          <h1 className="font-extrabold text-5xl">B illi G</h1>
        </button>
        <img className="front" src="../../front1.png" alt="" />
        <img className="houses" src="../../house.png" alt="vilage" />
      </div>
    </div>
  );
};

export default MenuButton;
