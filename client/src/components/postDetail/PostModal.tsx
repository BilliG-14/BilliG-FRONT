type PostModalType = {
  setShowModal: (state: boolean) => void;
  changeState: () => void;
  type: string;
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
  descriptionThree?: string;
  cautionDescription: string;
};

export default function PostModal({
  setShowModal,
  changeState,
  type,
  title,
  descriptionOne,
  descriptionTwo,
  descriptionThree,
  cautionDescription,
}: PostModalType) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-center pl-6 pb-2 p-3  border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            {/*body*/}
            <div className="relative p-6 text-start">
              <p className="mb-4 text-[13px] leading-5 font-semibold text-b-text-black">
                {descriptionOne}
                <br />
                {descriptionTwo}
                <br />
                {descriptionThree}
              </p>
              <p className="mb-2 text-sm text-red-500  font-semibold">
                {cautionDescription}
              </p>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-5 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                창 닫기
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-2 rounded shadow hover:bg-emerald-700 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={changeState}
              >
                {type === 'receive' ? '수령완료' : '반납완료'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
