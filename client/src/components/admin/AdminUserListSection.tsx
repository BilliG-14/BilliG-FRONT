import axios, { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

type User = {
  id: string;
  email?: string;
  nickName?: string;
  name?: string;
  phoneNumber?: string;
  postalCode?: string;
  address1?: string;
  address2?: string;
  createdAt?: string;
  updatedAt?: string;
};
const baseUrl = 'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app';
const endPoint = 'user';
const token = localStorage.getItem('token');
const apiUsers = {
  GET: async () => {
    const { data } = await axios({
      url: `/${endPoint}`,
      method: 'get',
      baseURL: `${baseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  UPDATE: async (updateUser: User) => {
    const { id, ...updated } = updateUser;
    await axios.patch(`${baseUrl}/${endPoint}/${id}`, JSON.stringify(updated), {
      headers: { 'Content-Type': `application / json` },
    });
  },
};

export default function AdminUserListSection() {
  const { isLoading, data, isError, error } = useQuery<User[], AxiosError>(
    ['users'],
    apiUsers.GET,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
      onSuccess: (_data) => {
        // 성공시 호출
        console.log(_data);
      },
      onError: (e: Error) => {
        console.log(e.message);
      },
    },
  );
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다</p>;
  }
  return (
    <section className="w-full text-b-text-black p-2">
      <table className="table-auto border-separate border-spacing-4 w-full">
        <thead className=" font-extrabold">
          <tr>
            <th>가입날짜</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>전화번호</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody className="font-semibold">
          {data &&
            data.map((user) => (
              <tr key={user.id} className="text-center">
                <td>{user.createdAt}</td>
                <td>{user.email}</td>
                <td>{user.nickName}</td>
                <td>{user.phoneNumber}</td>
                <td className="w-14">
                  <button className="border-b-yellow border-solid border-2 w-12 rounded-lg h-7 leading-7 text-b-yellow shadow-lg hover:bg-b-yellow hover:text-white">
                    조회
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
