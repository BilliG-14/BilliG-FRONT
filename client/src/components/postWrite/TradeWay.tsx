import { tradeWayStore } from './../../store/PostWriteStore';
import { useRef } from 'react';

export default function TradeWay() {
  const { setTradeWay } = tradeWayStore();

  // 직거래 체크박스 클릭 시 이벤트 (direct 상태 바꾸고, 거래방법 상태 변경)
  // function directCheckBoxClick(e: React.MouseEvent<HTMLInputElement>) {
  //   setDirect(e.currentTarget.checked);
  // }

  // 택배 체크박스 클릭 시 이벤트 (direct 상태 바꾸고, 거래방법 상태 변경)
  // function deliveryCheckBoxClick(e: React.MouseEvent<HTMLInputElement>) {
  //   setDelivery(e.currentTarget.checked);
  // }

  const direct = useRef<HTMLInputElement>(null);
  const delivery = useRef<HTMLInputElement>(null);

  function changeCheckBoxHandle() {
    setTradeWay(direct.current?.checked, delivery.current?.checked);
  }

  return (
    <section className="mb-4 h-10 flex items-center">
      <span className="w-[100px] p-3 text-center">거래방법</span>
      <input
        ref={direct}
        // onClick={directCheckBoxClick}
        onChange={changeCheckBoxHandle}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span className="mr-7">직거래</span>
      <input
        ref={delivery}
        // onClick={deliveryCheckBoxClick}
        onChange={changeCheckBoxHandle}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span>택배거래</span>
    </section>
  );
}
