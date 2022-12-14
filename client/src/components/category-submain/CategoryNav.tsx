export default function CategoryNav() {
  return (
    <nav className="flex bg-b-yellow w-100 h-16">
      <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold ">
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">IT기기</a>
        </li>
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">생활가전</a>
        </li>
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">캠핑/여행</a>
        </li>
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">스포츠/레저</a>
        </li>
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">완구/취미</a>
        </li>
        <li className="text-b-hash-text hover:scale-125 ease-out duration-300">
          <a href="#">도서/음반</a>
        </li>
      </ul>
    </nav>
  );
}
