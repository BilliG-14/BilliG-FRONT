import { CategoryType } from 'store/PostWriteStore';
import { useNavigate } from 'react-router-dom';

type NavProps = {
  postType: string;
  categories: CategoryType[];
};
export default function ProductsListNav(props: NavProps) {
  const navigate = useNavigate();
  const { postType, categories } = props;
  return (
    <nav className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto select-none">
      <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
        {categories.map((category) => {
          return (
            <li
              key={category._id}
              className="hover:text-b-yellow hover:scale-125 ease-out duration-300"
            >
              <p
                onClick={() => {
                  navigate(`/products/${postType}/${category._id}`);
                }}
              >
                {category.name}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
