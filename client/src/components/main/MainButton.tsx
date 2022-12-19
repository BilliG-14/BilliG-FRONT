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
      className="bg-amber-500 h-16 rounded-2xl w-80 mx-3 text-b-chat-text transition-all
       hover:text-white hover:bg-gradient-to-r from-[#e65c00] to-b-yellow"
    >
      <span className="font-bold">{props.content}</span>
      <i className="fa-solid fa-chevron-right ml-2"></i>
    </button>
  );
}
