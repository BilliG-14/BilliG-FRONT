import { Link } from 'react-router-dom';
import './MenuButton.css';

const MenuButton = () => {
  return (
    <div>
      <div className="section">
        <Link to="/" className="owner">
          빌려주기
        </Link>
        <img className="house1" src="./h1.png" alt="house1" />
        <Link to="/" className="renter">
          빌리기
        </Link>
        <img className="house2" src="./h2.png" alt="house2" />
        <img className="front" src="./front1.png" alt="" />
        <img className="houses" src="./house.png" alt="vilage" />
      </div>
    </div>
  );
};

export default MenuButton;
