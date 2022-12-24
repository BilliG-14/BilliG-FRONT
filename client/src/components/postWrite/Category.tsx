import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';

import { categoryStore, CategoryType } from './../../store/PostWriteStore';

export default function Category(props: CategoryType) {
  const { categoryId } = props;
  const { categorys, filteredCategory, setCategorys, setFilteredCategory } =
    categoryStore();
  // 카테고리 가져오기
  //   const [categorys, setCategorys] = useState<CategoryType[]>([]);
  //   const [filteredCategory, setFilteredCategory] = useState<CategoryType[]>([]);

  const categoryRef = useRef<HTMLSelectElement>(null);

  // 카테고리 받아오기
  useQuery(['categories'], () => api.get('/category'), {
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 60,
    onSuccess: (res) => setCategorys(res.data),
    onError: (err) => console.log('카테고리 에러', err),
  });

  // 사용자가 선택한 카테고리만 필터
  function changecategory() {
    const newFilteredCategory = categorys.filter(
      (_category) => _category._id === categoryRef.current?.value,
    );
    setFilteredCategory(newFilteredCategory[0]);
  }

  return (
    <select
      value={categoryId}
      onChange={changecategory}
      ref={categoryRef}
      className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
    >
      <option>카테고리 설정</option>
      {categorys.map((_category) => (
        <option key={_category._id} value={_category._id}>
          {_category.name}
        </option>
      ))}
    </select>
  );
}
