import { FaPeopleArrows } from 'react-icons/fa';

export default function ItemCard() {
  return (
    <div className="w-1/4 inline-block">
      <a href="#">
        <div>
          <img
            src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665"
            alt="m2 맥북"
            className=""
          />
        </div>
        <div className="item_info">
          <div className="title">
            <p className="name">Apple 2022 맥북 프로 13 M2</p>
            <p className="category">IT기기</p>
            <p className="adress">📍서울시 동대문구</p>
          </div>
          <div className="item_tag inline-flex">
            <FaPeopleArrows className="mr-1.5" />
            직거래
          </div>
          <div className="price">
            <p className="per_time">5,000원 / 시간</p>
            <p className="per_day">30,000원 / 일</p>
          </div>
        </div>
      </a>
    </div>
  );
}
