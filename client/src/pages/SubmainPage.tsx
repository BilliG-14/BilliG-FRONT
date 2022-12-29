import { Route, Routes } from 'react-router-dom';
// components
import Carousels from 'components/category-submain/Carousels';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import BorrowCategory from '../components/category-submain/BorrowCategory';
import LendCategory from '../components/category-submain/LendCategory';

export default function SubmainPage() {
  return (
    <div>
      <Carousels />
      <Routes>
        <Route path="/" element={<BorrowCategory />} />
        <Route path="/borrow" element={<LendCategory />} />
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
}
