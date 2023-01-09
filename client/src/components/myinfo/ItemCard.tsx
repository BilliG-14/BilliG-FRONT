import DealTag from 'components/tag/DealTag';
import DealStepTag from '../tag/DealStepTag';
import { useNavigate } from 'react-router-dom';
import { PostDataType } from 'types/productType';
import DoneTag from '../tag/DoneTag';

interface BorrowPostProps {
  item: PostDataType;
  type: string;
}

export default function ItemCard({ item, type }: BorrowPostProps) {
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
      className="h-40 cursor-pointer hover:opacity-70"
      onClick={() => {
        navigate(`/read/${item._id}`);
      }}
    >
      <li className="flex w-full h-full justify-center py-3">
        <div className="item_info flex w-4/5 border-b-2 border-solid border-gray-300">
          <img
            src={imgUrl[0]}
            alt={title}
            className="w-24 h-24 object-contain"
          />
          <div className="w-4/5 pl-10">
            <p className="text-lg font-semibold mt-1">{title}</p>
            <ul>
              {type === 'borrow' || type === 'done' ? (
                <li className="mt-1">
                  <span>대여기간 : </span>
                  <span>{`${period?.start} ~ `}</span>
                  <span>{`${period?.end}`}</span>
                </li>
              ) : null}
              <li className="text-b-text-darkgray mt-3 mb-3 dark:text-b-text-brightgray">
                <span>거래지역 : </span>
                <span>{`📍 ${address}`}</span>
              </li>
              <li>
                {stateOfTransaction === 1 || stateOfTransaction === 2 ? (
                  <DealStepTag stateOfTransaction={stateOfTransaction} />
                ) : null}
                {stateOfTransaction === 3 ? <DoneTag /> : null}
              </li>
            </ul>
          </div>
        </div>
        <div className="item_deal_price flex flex-col items-center justify-evenly border-b-2 border-solid border-gray-300">
          <div className="flex flex-col justify-center items-center ">
            {tradeWay.direct ? <DealTag deal="직거래" /> : null}
            {tradeWay.delivery ? <DealTag deal="택배거래" /> : null}
          </div>
          <div className="price mt-1">
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
