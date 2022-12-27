import { useIsLoginStore } from 'store/LoginJoinStore';
import { Route, Routes } from 'react-router-dom';
// components
import Nav from '../components/nav/Nav';
import TrueNav from 'components/nav/TrueNav';
import Carousels from 'components/category-submain/Carousels';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import BorrowCategory from '../components/category-submain/BorrowCategory';
import LendCategory from '../components/category-submain/LendCategory';

export default function SubmainPage() {
  const { isLogin } = useIsLoginStore();
  return (
    <div>
      <div className="w-screen max-w-screen-lg m-auto">
        {isLogin ? <TrueNav /> : <Nav />}
      </div>
      <Carousels />
      <Routes>
        <Route path="/" element={<LendCategory />} />
        <Route path="/borrow" element={<BorrowCategory />} />
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
}
