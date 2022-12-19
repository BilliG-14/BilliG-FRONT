import { MouseEvent, useState } from 'react';

export default function TradeWay() {
  type TradeWayType = {
    direct: boolean;
    delivery: boolean;
  };

  const [tradeWay, setTradeWay] = useState<TradeWayType>({
    direct: false,
    delivery: false,
  });

  // 직거래 체크박스 클릭 시 이벤트 (direct 상태 바꾸고, 거래방법 상태 변경)
  function directCheckBoxClick(e: MouseEvent<HTMLInputElement>) {
    const newTradeWay = { ...tradeWay, direct: e.currentTarget.checked };
    setTradeWay(newTradeWay);
  }
  // 택배 체크박스 클릭 시 이벤트 (direct 상태 바꾸고, 거래방법 상태 변경)
  function deliveryCheckBoxClick(e: MouseEvent<HTMLInputElement>) {
    const newTradeWay = { ...tradeWay, delivery: e.currentTarget.checked };
    setTradeWay(newTradeWay);
  }

  function test() {
    console.log(tradeWay);
  }

  return (
    <section className="mb-4 h-10 flex items-center">
      <span className="w-[100px] p-3 text-center">거래방법</span>
      <input
        onClick={directCheckBoxClick}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span className="mr-7">직거래</span>
      <input
        onClick={deliveryCheckBoxClick}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span>택배거래</span>
      <div onClick={test}>버튼</div>
    </section>
  );
}
