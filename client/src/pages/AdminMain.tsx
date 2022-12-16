function AdminHeader() {
  return (
    <>
      {' '}
      <p className="max-w-screen-lg mx-auto p-6 text-3xl font-extrabold">
        Admin Page
      </p>
      <hr className="border-2 border-b-text-black max-w-screen-lg mx-auto"></hr>
    </>
  );
}
export default function AdminMain() {
  return (
    <>
      <AdminHeader />
      <div className="max-w-screen-lg mx-auto mt-36">
        <div className="flex w-full">
          <button className=" bg-b-bg-gray h-96 w-full mx-9 rounded-2xl group hover:bg-b-yellow  hover:text-white transition-colors shadow-lg">
            <i className="fa-solid fa-user text-9xl group-hover:scale-110 transition-transform duration-700"></i>
            <p className="text-2xl mt-6 font-semibold group-hover:font-extrabold">
              회원 관리
            </p>
          </button>
          <button className=" bg-b-bg-gray h-96 w-full mx-9 rounded-2xl group hover:bg-b-yellow  hover:text-white transition-colors shadow-lg">
            <i className="fa-solid fa-file-pen text-9xl group-hover:scale-110 transition-transform duration-700"></i>
            <p className="text-2xl mt-6 font-semibold group-hover:font-extrabold">
              게시글 관리
            </p>
          </button>
          <button className=" bg-b-bg-gray h-96 w-full mx-9 rounded-2xl group hover:bg-b-yellow  hover:text-white transition-colors shadow-lg">
            <i className="fa-solid fa-handshake-angle text-9xl group-hover:scale-110 transition-transform duration-700"></i>
            <p className="text-2xl mt-6 font-semibold group-hover:font-extrabold">
              대여 관리
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
