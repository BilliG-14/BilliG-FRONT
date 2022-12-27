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
        <Route path="/" element={<LendCategory />} />
        <Route path="/borrow" element={<BorrowCategory />} />
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
}
