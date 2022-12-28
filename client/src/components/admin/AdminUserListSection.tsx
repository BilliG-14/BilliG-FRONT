import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from 'api/customAxios';
import useAdminPageStore from 'store/AdminPageStore';
import Loading from 'components/Loading';
type User = {
  _id: string;
  email?: string;
  nickName?: string;
  name?: string;
  phoneNumber?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  createdAt: string;
  updatedAt?: string;
  role: string;
};

const apiUsers = {
  GET: async () => {
    const res = await api.get('user');
    return res.data;
  },
};

export default function AdminUserListSection() {
  const setSelectedUserId = useAdminPageStore(
    (state) => state.setSelectedUserId,
  );
  const { isLoading, data, isError } = useQuery<User[], AxiosError>(
    ['users'],
    apiUsers.GET,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
    },
  );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다</p>;
  }
  return (
    <section className="w-full text-b-text-black p-2  h-[85vh] overflow-y-auto">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>가입날짜</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>전화번호</th>
            <th>권한</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {data?.map((user) => {
            return (
              <tr key={user._id} className="text-center">
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{user.email}</td>
                <td>{user.nickName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td className="w-14">
                  <button
                    className="border-b-yellow border-solid border-2 w-12 rounded-lg h-7 leading-7 text-b-yellow shadow-lg hover:bg-b-yellow hover:text-white"
                    onClick={() => {
                      setSelectedUserId(user._id);
                    }}
                  >
                    조회
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
