import { BsFillChatFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function ChatIcon() {
  return (
    <div className="flex justify-end">
      <div className="w-14 h-14 rounded bg-b-yellow flex justify-center items-center">
        <Link to="/chat">
          <BsFillChatFill className="text-3xl text-white" />
        </Link>
      </div>
    </div>
  );
}

export default ChatIcon;
