export default function ErrorPage() {
  return (
    <>
      <div className="w-4/5 h-[300px] mx-auto my-60">
        <div>
          <div className="relative">
            <img
              src="/img/billig.png"
              alt="billig logo"
              className="w-[25%] mx-auto opacity-60"
            />

            <div className="absolute text-3xl font-black text-b-text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Sorry, Something's wrong!
            </div>
          </div>
          <div className="">
            <div className="text-lg leading-7 text-center p-4">
              헉! <br />
              죄송합니다.
              <div className="text-sm">잠시 후 다시 시도해 주세요.</div>
            </div>

            <div className="text-center p-4">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="text-gray-900  bg-gray-200 font-medium rounded-lg text-sm px-3 py-1.5   transition duration-100"
              >
                새로고침
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
