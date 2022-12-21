type User = {
  _id: string;
  email: string;
  nickName: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminUserListSection() {
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>가입날짜</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>권한</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {/* {userData.map((user) => (
            <tr key={user.email} className="text-center">
              <td>{user.joinDate}</td>
              <td>{user.email}</td>
              <td>{user.nickName}</td>
              <td>{user.auth}</td>
              <td className="w-14">
                <button className="border-b-yellow border-solid border-2 w-12 rounded-lg h-7 leading-7 text-b-yellow shadow-lg hover:bg-b-yellow hover:text-white">
                  조회
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </section>
  );
}
