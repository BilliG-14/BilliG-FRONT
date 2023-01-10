import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// components
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
import Carousels from '../components/category-submain/Carousels';
import Loading from '../components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';

const SubmainCategory = lazy(
  () => import('../components/category-submain/SubmainCategory'),
);

export default function SubmainPage() {
  const { pathname } = useLocation();
  return (
    <div>
      <Carousels />
      <ErrorBoundary key={pathname}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<SubmainCategory type="borrow" />} />
            <Route path="/borrow" element={<SubmainCategory type="lend" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <ChatIcon />
      <Footer />
    </div>
  );
}
