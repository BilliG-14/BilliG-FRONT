import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';

export default function CategoryNav() {
  const { isLoading, data: categories } = useQuery(
    ['categories'],
    async () => {
      console.log('fetching...');
      return axios.get(
        'https://port-0-village-dpuqy925lbn63gyo.gksl2.cloudtype.app/category',
      );
    },
    { refetchOnWindowFocus: false, staleTime: 60 * 1000 * 60 },
  );

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log(e);
  };

  if (isLoading) return <p>Loading..</p>;
  return (
    <nav className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto">
      <ul
        className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold"
        onClick={handleClick}
      >
        {categories?.data.map((category: { _id: string; name: string }) => {
          return (
            <li
              key={category._id}
              className="hover:text-b-yellow hover:scale-125 ease-out duration-300"
            >
              <a href="#">{category.name}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
