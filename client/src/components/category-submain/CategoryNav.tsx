import React, { MouseEvent } from 'react';

export default function CategoryNav() {
  const categoryList: { id: number; title: string }[] = [
    { id: 1, title: 'IT기기' },
    { id: 2, title: '생활가전' },
    { id: 3, title: '캠핑/여행' },
    { id: 4, title: '스포츠/레저' },
    { id: 5, title: '완구/취미' },
    { id: 6, title: '도서/음반' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log(e);
  };
  return (
    <nav className="flex w-100 h-16 border-b-2 border-solid border-gray-500">
      <ul
        className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold"
        onClick={handleClick}
      >
        {categoryList.map((category) => {
          return (
            <li
              key={category.id}
              className="hover:text-b-yellow hover:scale-125 ease-out duration-300"
            >
              <a href="#">{category.title}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
