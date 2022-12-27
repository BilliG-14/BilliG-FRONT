import { CategoryType } from 'store/PostWriteStore';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from 'api/customAxios';
import { useQuery } from '@tanstack/react-query';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';

type NavProps = {
  postType: string;
};
type CategoriesResType = {
  data: CategoryType[];
};
export default function ProductsListNav(props: NavProps) {
  const navigate = useNavigate();
  const { postType } = props;
  /*네비게이션에 사용될 카테고리 목록 통신 */
  const {
    isLoading,
    data: categoriesRes,
    isError,
  } = useQuery<CategoriesResType, AxiosError>(
    ['categories'],
    async () => {
      const res = await api.get('/category');
      return res;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );
  if (isLoading) return <Loading />;
  if (isError) return <NotFound />;
  console.log(categoriesRes);
  const categories = categoriesRes.data;
  return (
    <nav className="flex max-w-screen-lg h-16 border-b-2 border-solid border-gray-500 m-auto select-none">
      <ul className="flex space-x-10 text-center items-center m-auto text-xl font-extrabold">
        {categories &&
          categories?.map((category) => {
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
