import { useNavigate } from 'react-router-dom';

export default function NoProducts() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center justify-center py-48 ">
      <p className="font-bold text-2xl">게시물이 존재하지 않습니다.</p>
      <button
        className="mt-5 text-lg px-2 py-1 bg-b-yellow text-white rounded-lg font-bold"
        onClick={() => {
          navigate('/');
        }}
      >
        메인화면으로
      </button>
    </div>
  );
}
