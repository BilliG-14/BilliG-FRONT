import DealTag from 'components/tag/DealTag';
import { Item } from 'components/myinfo/MyLendPostList';
import { useNavigate } from 'react-router-dom';

type BorrowItemProps = {
  item: Item;
  categoryName: string;
};

export default function SubmainBorrowItemCard({
  item,
  categoryName,
}: BorrowItemProps) {
  const { title, imgUrl, address, hashtag, tradeWay, price, period } = item;
  const navigate = useNavigate();

  return (
    <div
      className="w-1/4 inline-block my-5 px-2.5 mx-4 rounded-lg bg-white cursor-pointer hover:scale-110  hover:ease-in transition-all duration-300"
      onClick={() => {
        navigate(`/read/${item._id}`);
      }}
    >
      <div className="pic w-full h-40 mb-2 p-2 flex items-center justify-center object-contain">
        <img
          className=" w-full h-full"
          src={
            imgUrl[0]
              ? imgUrl[0]
              : `${process.env.PUBLIC_URL}/img/product_default.png`
          }
          alt={hashtag[0] ? hashtag[0] : 'item'}
        />
      </div>
      <div className="item_info my-2 text-left">
        <div className="title ">
          <p className="name h-12 mb-1 font-bold leading-6 underline underline-offset-4">
            {title}
          </p>
          <p className="category mb-1 font-semibold text-sm">
            {`${period.start} ~ ${period.end}`}
          </p>
          <p className="category mb-1 text-b-text-darkgray text-sm">
            {categoryName}
          </p>
          <p className="adress h-8 text-b-text-darkgray text-sm mb-1">
            {`📍 ${address}`}
          </p>
        </div>
        <div className="flex justify-end mb-1">
          {tradeWay.direct ? <DealTag deal="직거래" /> : null}
          {tradeWay.delivery ? <DealTag deal="택배거래" /> : null}
        </div>
        <div className="price text-right">
          {/* <p className="per_time mb-2">
            <span className="font-semibold">
              {`${price.priceTime.toLocaleString('ko-KR')}원`}
            </span>
            <span className="text-xs"> / 시간</span>
          </p> */}
          <p className="per_day">
            <span className="font-semibold">{`${price.priceDay.toLocaleString(
              'ko-KR',
            )}원`}</span>
            <span className="text-xs"> / 일</span>
          </p>
        </div>
      </div>
    </div>
  );
}
