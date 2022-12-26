import { BsFillChatFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function ChatIcon() {
  const navigate = useNavigate();
  const goChat = () => {
    navigate('/chatjoin');
  };
  return (
    <div className="w-full flex justify-end px-14">
      <button onClick={goChat}>
        <div className="fixed bottom-10  w-14 h-14 rounded bg-b-yellow flex justify-center items-center">
          <BsFillChatFill className="text-3xl text-white" />
        </div>
      </button>
    </div>
  );
}

export default ChatIcon;
