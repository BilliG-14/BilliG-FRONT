import Carousels from 'components/category-submain/Carousels';
import Nav from '../components/nav/Nav';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from 'components/nav/TrueNav';
import LendCategory from '../components/category-submain/LendCategory';

export default function SubmainLend() {
  const { isLogin } = useIsLoginStore();
  return (
    <div>
      <div className="w-screen max-w-screen-lg m-auto">
        {isLogin ? <TrueNav /> : <Nav />}
      </div>
      <Carousels />
      <LendCategory />
      <ChatIcon />
      <Footer />
    </div>
  );
}
