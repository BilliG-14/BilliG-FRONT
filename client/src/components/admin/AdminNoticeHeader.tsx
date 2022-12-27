import { useNoticePageStore } from 'store/AdminPageStore';

export default function AdminNoticeHeader() {
  const { isWriting, onIsWriting, offIsWriting } = useNoticePageStore();
  const handleClickWriting = () => {
    if (!isWriting) onIsWriting();
  };
  const handleClickList = () => {
    if (isWriting) offIsWriting();
  };
  const applyActiveStyle = (isActive: boolean) =>
    isActive ? ' text-b-yellow font-extrabold' : '';
  return (
    <header className="flex w-full py-2 h-14 border-b-4 border-solid text-b-text-darkgray border-b-text-gray items-center font-bold text-lg ">
      <a href="#!" onClick={handleClickWriting}>
        <p
          className={`w-36 text-center hover:scale-110  transition
          ${applyActiveStyle(isWriting)}`}
        >
          공지 작성하기
        </p>
      </a>
      <a href="#!" onClick={handleClickList}>
        <p
          className={`w-36 text-center hover:scale-110  transition
          ${applyActiveStyle(!isWriting)}`}
        >
          공지사항 목록
        </p>
      </a>
    </header>
  );
}
