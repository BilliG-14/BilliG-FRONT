import Footer from 'components/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import NoticeDetail from '../components/Notice/NoticeDetail';
import NoticeList from 'components/Notice/NoticeList';

export default function Notices() {
  return (
    <div className="w-screen m-auto relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-3xl font-extrabold ml-10 mt-10">
          <p>공지사항</p>
        </div>
        <Routes>
          <Route path="/" element={<NoticeList />} />
          <Route path="/:id" element={<NoticeDetail />} />
        </Routes>
      </div>
      <div className="w-full h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
