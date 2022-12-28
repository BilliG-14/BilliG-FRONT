import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';

import { categoryStore, CategoryType } from './../../store/PostWriteStore';
import Loading from 'components/Loading';

export default function Category(props: CategoryType) {
  const { categoryId } = props;
  const { categorys, setCategorys, setFilteredCategory } = categoryStore();

  const categoryRef = useRef<HTMLSelectElement>(null);

  // 카테고리 받아오기
  const { isLoading, data: categories } = useQuery(
    ['categories'],
    async () => {
      const result = await api.get('/category');
      return result.data;
    },
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  // 사용자가 선택한 카테고리만 필터
  function changecategory() {
    setFilteredCategory(categoryRef.current?.selectedOptions[0].value);
  }

  return (
    <select
      onChange={changecategory}
      ref={categoryRef}
      className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
    >
      <option>카테고리 설정</option>
      {categories.map((category: { _id: string; name: string }) => (
        <option
          key={category._id}
          value={category._id}
          selected={categoryId === category._id ? true : false}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}
