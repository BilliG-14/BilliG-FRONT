import DealTag from 'components/tag/DealTag';
import { PostDataType } from 'types/productType';

interface SearchItemCardProp {
  item: PostDataType;
}

export default function SearchItemCard({ item }: SearchItemCardProp) {
  const { title, address, imgUrl, hashtag, tradeWay, price } = item;
  return (
    <li
      className="h-36 flex w-full justify-center py-3 cursor-pointer hover:opacity-70"
      onClick={() => {
        window.open(`/read/${item._id}`, '_blank');
      }}
    >
      <div className="item_info flex w-2/3 border-b-2 border-solid border-b-yellow">
        <img
          src={
            imgUrl[0]
              ? imgUrl[0]
              : `${process.env.PUBLIC_URL}/product_default.png`
          }
          alt={hashtag[0] ? hashtag[0].name : 'item'}
          className="w-24 h-24 m-auto"
        />
        <div className="w-4/5 p-3 pl-10">
          <p className="text-lg font-semibold mt-1">{title}</p>
          <ul>
            <li className="text-b-text-darkgray mt-3 dark:text-b-text-brightgray">
              <span>거래지역 : </span>
              <span>{`📍 ${address}`}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="item_deal_price flex flex-col items-center justify-evenly border-b-2 border-solid border-b-yellow">
        <div className="flex flex-col justify-center items-center">
          {tradeWay.direct ? <DealTag deal="직거래" /> : null}
          {tradeWay.delivery ? <DealTag deal="택배거래" /> : null}
        </div>
        <div className="price text-right mt-1">
          <p className="per_day">
            <span className="font-semibold">
              {`${price.priceDay.toLocaleString('ko-KR')} 원`}
            </span>
            <span className="text-xs"> / 일</span>
          </p>
        </div>
      </div>
    </li>
  );
}
