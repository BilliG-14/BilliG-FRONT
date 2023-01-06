import DealTag from 'components/tag/DealTag';
import { useNavigate } from 'react-router-dom';
import { PostDataType } from 'types/productType';

type ItemCardProps = {
  item: PostDataType;
  type: string;
  categoryName: string;
};

export default function SubmainItemCard({
  item,
  type,
  categoryName,
}: ItemCardProps) {
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
          className=" w-full h-full object-contain"
          src={
            imgUrl[0]
              ? imgUrl[0]
              : `${process.env.PUBLIC_URL}/img/product_default.png`
          }
          alt={hashtag[0] ? hashtag[0].name : 'item'}
        />
      </div>
      <div className="item_info my-2 text-left">
        <div className="title ">
          <p className="name h-12 mb-1 font-bold leading-6 underline underline-offset-4">
            {title}
          </p>
          {type === 'borrow' ? (
            <p className="category mb-1 font-semibold text-sm">
              {`${period?.start} ~ ${period?.end}`}
            </p>
          ) : null}
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
