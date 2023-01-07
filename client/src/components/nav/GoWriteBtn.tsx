import { useNavigate } from 'react-router-dom';
export default function GoWriteBtn() {
  const navigate = useNavigate();
  return (
    <div className="mr-5">
      <button
        className="text-xl font-bold hover:text-b-yellow hover:ease-in duration-300"
        onClick={() => {
          navigate('/write');
        }}
      >
        물품 등록하기
      </button>
    </div>
  );
}
