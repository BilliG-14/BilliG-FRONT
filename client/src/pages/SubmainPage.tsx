import { Route, Routes } from 'react-router-dom';
// components
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import SubmainCategory from '../components/category-submain/SubmainCategory';
import Carousels from '../components/category-submain/Carousels';
import { Suspense } from 'react';
import Loading from 'components/Loading';

export default function SubmainPage() {
  return (
    <div>
      <Carousels />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SubmainCategory type="borrow" />} />
          <Route path="/borrow" element={<SubmainCategory type="lend" />} />
        </Routes>
      </Suspense>
      <ChatIcon />
      <Footer />
    </div>
  );
}
