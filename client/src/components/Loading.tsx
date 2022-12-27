export default function Loading() {
  return (
    <>
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-b-yellow border-4 h-14 w-14"></div>
      </div>
    </>
  );
}
