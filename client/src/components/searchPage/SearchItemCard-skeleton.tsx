import { GoPackage } from 'react-icons/go';

export default function SearchItemCardSeleton() {
  return (
    <li className="h-36 flex w-full justify-center py-3 animate-pulse">
      <div className="item_info flex w-2/3 border-b-2 border-solid border-b-text-gray">
        <div className="w-24 h-24 m-auto bg-b-text-gray rounded-md"></div>
        <div className="w-4/5 p-3 pl-10">
          <p className="text-lg font-semibold mt-1 bg-b-text-gray text-b-text-gray rounded-md">
            여기가 타이틀이다.
          </p>
          <ul>
            <li className="text-b-text-darkgray mt-3">
              <span className="bg-b-text-gray text-b-text-gray mr-2 rounded-md">
                거래지역 :
              </span>
              <span className="bg-b-text-gray text-b-text-gray rounded-md">{`서울 중랑구`}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="item_deal_price flex flex-col items-center justify-evenly border-b-2 border-solid border-b-text-gray">
        <div className="flex flex-col justify-center items-center">
          <div className="item_tag w-49px h-16px inline-flex text-b-hash-text p-1 rounded-lg font-extrabold mb-1 mr-1 bg-b-text-gray">
            <GoPackage className="mr-1 text-sm text-b-text-gray" />
            <span className="text-xs text-b-text-gray">직거래</span>
          </div>
        </div>
        <div className="price text-right mt-1 bg-b-text-gray rounded-md">
          <p className="per_day">
            <span className="font-semibold text-b-text-gray">{`20,000 원`}</span>
            <span className="text-xs text-b-text-gray"> / 일</span>
          </p>
        </div>
      </div>
    </li>
  );
}
