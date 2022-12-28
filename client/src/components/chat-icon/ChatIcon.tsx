import { BsFillChatFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function ChatIcon() {
  const navigate = useNavigate();
  const goChat = () => {
    navigate('/chat');
  };
  return (
    <div className="max-w-screen-lg mx-auto flex justify-end px-14 fixed">
      <button onClick={goChat}>
        <div className="fixed bottom-20 right-12 w-14 h-14 rounded bg-b-yellow flex justify-center items-center">
          <BsFillChatFill className="text-3xl text-white" />
        </div>
      </button>
    </div>
  );
}

export default ChatIcon;
