import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// components
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import Carousels from '../components/category-submain/Carousels';
import Loading from '../components/Loading';

const SubmainCategory = lazy(
  () => import('../components/category-submain/SubmainCategory'),
);

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
