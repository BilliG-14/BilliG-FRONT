import Carousels from 'components/category-submain/Carousels';
import Nav from '../components/nav/Nav';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from 'components/nav/TrueNav';
import BorrowCategory from '../components/category-submain/BorrowCategory';

export default function SubmainBorrow() {
  const { isLogin } = useIsLoginStore();
  return (
    <div>
      <div className="w-screen max-w-screen-lg m-auto">
        {isLogin ? <TrueNav /> : <Nav />}
      </div>
      <Carousels />
      <BorrowCategory />
      <ChatIcon />
      <Footer />
    </div>
  );
}
