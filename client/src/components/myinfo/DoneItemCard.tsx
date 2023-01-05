import DealTag from 'components/tag/DealTag';
import DoneTag from 'components/tag/DoneTag';
import { useNavigate } from 'react-router-dom';
import { GetItemType } from 'types/productType';

interface DoneItemtProps {
  item: GetItemType;
}

export default function DoneItemCard({ item }: DoneItemtProps) {
  const {
    title,
    address,
    imgUrl,
    tradeWay,
    price,
    period,
    stateOfTransaction,
  } = item;
  const navigate = useNavigate();
  return (
    <div
      className="h-44 cursor-pointer opacity-70 hover:opacity-100 hover:bg-b-bg-gray"
      onClick={() => {
        navigate(`/read/${item._id}`);
      }}
    >
      <li className="flex w-full h-full justify-center py-3">
        <div className="item_info flex w-4/5 border-b-2 border-solid border-gray-300">
          <img
            src={imgUrl[0]}
            alt="m2 맥북"
            className="w-24 h-24 object-contain"
          />
          <div className="w-4/5 pl-10">
            <p className="text-lg font-semibold mt-1">{title}</p>
            <ul>
              <li className="mt-2">
                <span>대여기간 : </span>
                <span>{`${period.start} ~ `}</span>
                <span>{`${period.end}`}</span>
              </li>
              <li className="flex flex-col text-b-text-darkgray mt-2">
                <div className="mb-2">
                  <span>거래지역 : </span>
                  <span className="mr-2">{`📍 ${address}`}</span>
                </div>
                <div className="mt-2">
                  {tradeWay.direct ? <DealTag deal="직거래" /> : null}
                  {tradeWay.delivery ? <DealTag deal="택배거래" /> : null}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="item_deal_price flex flex-col items-center justify-evenly border-b-2 border-solid border-gray-300">
          <div className="flex flex-col justify-center items-center">
            {stateOfTransaction === 3 ? <DoneTag /> : null}
          </div>
          <div className="price text-right mt-1">
            <p className="per_day">
              <span className="font-semibold">{`${price.priceDay.toLocaleString(
                'ko-KR',
              )} 원`}</span>
              <span className="text-xs"> / 일</span>
            </p>
          </div>
        </div>
      </li>
    </div>
  );
}
