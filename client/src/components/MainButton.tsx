import { useNavigate } from 'react-router-dom';

export type ButtonProps = {
  content: string;
  path?: string;
};
export default function MainButton(props: ButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (props.path) {
      navigate(props.path);
      return;
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-amber-500 p-5 rounded-2xl w-80 m-5 hover:bg-amber-600"
    >
      <span className="font-bold text-b-chat-text">{props.content}</span>
      <i className="fa-solid fa-chevron-right ml-2 text-b-chat-text"></i>
    </button>
  );
}
