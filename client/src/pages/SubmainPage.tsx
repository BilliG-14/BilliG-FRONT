import { Route, Routes } from 'react-router-dom';
// components
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import SubmainCategory from '../components/category-submain/SubmainCategory';
import CarouselS from '../components/category-submain/CarouselS';

export default function SubmainPage() {
  return (
    <div>
      <CarouselS />
      <Routes>
        <Route path="/" element={<SubmainCategory type="borrow" />} />
        <Route path="/borrow" element={<SubmainCategory type="lend" />} />
      </Routes>
      <ChatIcon />
      <Footer />
    </div>
  );
}
