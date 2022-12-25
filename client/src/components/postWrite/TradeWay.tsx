import { tradeWayStore } from './../../store/PostWriteStore';
import { useRef } from 'react';

export default function TradeWay() {
  const { tradeWay, setTradeWay } = tradeWayStore();

  const direct = useRef<HTMLInputElement>(null);
  const delivery = useRef<HTMLInputElement>(null);

  function changeCheckBoxHandle() {
    setTradeWay(direct.current?.checked, delivery.current?.checked);
  }

  return (
    <section className="h-10 flex items-center">
      <span className="w-[100px] p-3 text-center">거래방법</span>
      <input
        checked={tradeWay.direct}
        ref={direct}
        onChange={changeCheckBoxHandle}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span className="mr-7">직거래</span>
      <input
        checked={tradeWay.delivery}
        ref={delivery}
        onChange={changeCheckBoxHandle}
        type="checkbox"
        className="mr-2 appearance-none h-4 w-4 border rounded-md border-gray-300  bg-white checked:bg-b-yellow checked:border-b-yellow focus:outline-none transition duration-100 align-top cursor-pointer"
      />
      <span>택배거래</span>
    </section>
  );
}
