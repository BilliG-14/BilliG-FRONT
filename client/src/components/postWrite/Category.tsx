import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';

import { categoryStore, CategoryType } from './../../store/PostWriteStore';

export default function Category(props: CategoryType) {
  const { categoryId } = props;
  const { categorys, filteredCategory, setCategorys, setFilteredCategory } =
    categoryStore();

  // useEffect(() => {
  //   // 실제 작성했던 카테고리를 미리 필터된 state에 넣어두기
  //   if (!filteredCategory) {
  //     console.log('useeffect');
  //     setFilteredCategory(categoryId);
  //   }
  // }, []);

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

  // 실제 작성했던 카테고리를 미리 필터된 state에 넣어두기
  // setFilteredCategory(categoryId);

  // if (!filteredCategory) {
  //   console.log('useeffect');
  //   setFilteredCategory(categoryId);
  // }

  // 사용자가 선택한 카테고리만 필터
  function changecategory() {
    const newFilteredCategory = categorys.filter(
      (category) => category._id === categoryRef.current?.value,
    );
    setFilteredCategory(newFilteredCategory[0]._id);
  }

  return (
    <select
      onChange={changecategory}
      ref={categoryRef}
      className="flex-none pl-3 w-1/6 h-10 border-solid border  border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2"
    >
      <option>카테고리 설정</option>
      {categorys.map((category) => (
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
