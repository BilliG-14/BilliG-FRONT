import DealTag from 'components/tag/DealTag';
import { ItemType } from './Category';

type ItemProps = {
  item: ItemType;
};

export default function ItemCard({ item }: ItemProps) {
  const { img, title, category, address, deal, price } = item;

  return (
    <div className="w-1/5 inline-block my-5 px-2.5 border-b border-gray-300 border-solid mx-4 bg-white rounded-lg">
      <a href="#">
        <div className="pic mb-2">
          <img src={img} alt="m2 맥북" />
        </div>
        <div className="item_info my-2 text-left">
          <div className="title ">
            <p className="name mb-1 font-bold leading-6 underline underline-offset-4">
              {title}
            </p>
            <p className="category mb-1 text-b-text-darkgray text-sm">
              {category}
            </p>
            <p className="adress text-b-text-darkgray text-sm">
              {`📍 ${address}`}
            </p>
          </div>
          <DealTag deal={deal} />
          <div className="price text-right">
            <p className="per_time mb-2">
              <span className="font-semibold"> {`${price.time}원`}</span>
              <span className="text-xs"> / 시간</span>
            </p>
            <p className="per_day">
              <span className="font-semibold"> {`${price.day}원`}</span>
              <span className="text-xs"> / 일</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
