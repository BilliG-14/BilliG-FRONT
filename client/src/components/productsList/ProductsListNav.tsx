import { CategoryType } from 'store/PostWriteStore';

type NavProps = {
  postType: string;
  categories: CategoryType[];
};
export default function ProductsListNav(props: NavProps) {
  const { postType, categories } = props;
  return (
    <nav className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto">
      <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
        {categories.map((category) => {
          return (
            <li
              key={category._id}
              className="hover:text-b-yellow hover:scale-125 ease-out duration-300"
            >
              <a href={`/products/${postType}/${category._id}`}>
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
