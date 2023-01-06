import { Route, Routes } from 'react-router-dom';
// components
import Carousels from 'components/category-submain/Carousels';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import SubmainCategory from '../components/category-submain/SubmainCategory';

export default function SubmainPage() {
  return (
    <div>
      <Carousels />
      <Routes>
        <Route path="/" element={<SubmainCategory type="borrow" />} />
        <Route path="/borrow" element={<SubmainCategory type="lend" />} />
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
}
