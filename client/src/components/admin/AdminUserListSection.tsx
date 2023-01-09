import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import api from 'api/customAxios';
import useAdminPageStore from 'store/AdminPageStore';
import Loading from 'components/Loading';
import { UserType } from '../../types/userType';
import { getUsers } from 'api/user-api';
import { useState } from 'react';

export default function AdminUserListSection() {
  const [filterSuspension, setFilterSuspension] = useState<boolean>(false);
  const setSelectedUserId = useAdminPageStore(
    (state) => state.setSelectedUserId,
  );
  const {
    isLoading,
    data: users,
    isError,
  } = useQuery<UserType[], AxiosError>(['users'], getUsers, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    staleTime: 60 * 1000 * 60,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다</p>;
  }
  console.log(users);
  return (
    <section className="w-full text-b-text-black dark:text-b-dark-text p-2  h-[85vh] overflow-y-auto">
      <div className="w-full font-bold py-1 ml-8">
        <label htmlFor="showSuspended">정지계정만 보기</label>
        <input
          type="checkbox"
          id="showSuspended"
          className="ml-1"
          onChange={() => {
            setFilterSuspension(!filterSuspension);
          }}
        />
      </div>
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
          {users?.map((user) => {
            if (filterSuspension && !user.suspension) return null;
            return (
              <tr key={user._id} className="text-center">
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                {user.suspension ? (
                  <td className="text-red-500 font-extrabold">{user.email}</td>
                ) : (
                  <td>{user.email}</td>
                )}
                <td>{user.nickName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.role}</td>
                <td className="w-14">
                  <button
                    className="border-b-yellow border-solid border-2 w-12 rounded-lg py-1 text-b-yellow shadow-lg hover:bg-b-yellow hover:text-white"
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
