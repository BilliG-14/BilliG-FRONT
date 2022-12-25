import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import api from 'api/customAxios';
import { useNavigate } from 'react-router-dom';

export default function ProductsListNav() {
  const navigate = useNavigate();
  const { isLoading, data: categories } = useQuery(
    ['categories'],
    async () => {
      console.log('fetching...');
      return api.get('/category');
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
              <a
                href="#!"
                onClick={() => navigate(`/products/lend/${category._id}`)}
              >
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
