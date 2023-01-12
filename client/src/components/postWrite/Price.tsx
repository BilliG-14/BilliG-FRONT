import { priceStore } from 'store/PostWriteStore';

export default function Price() {
  const { price, setPrice } = priceStore();

  function changePriceDay(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.currentTarget?.value));
  }

  return (
    <>
      <div className="w-[100px] p-3 text-center">요금</div>
      <input
        value={price}
        onChange={changePriceDay}
        type="number"
        className="p-3 mx-2 w-54 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
      />
      <span className="mr-9">원/일</span>
    </>
  );
}
