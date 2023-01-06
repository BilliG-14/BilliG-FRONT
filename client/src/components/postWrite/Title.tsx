import { titleStore } from './../../store/PostWriteStore';

export default function Title() {
  const { title, setTitle } = titleStore();

  // 제목 글자수 제한
  function checkWordsNumber(e: React.FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length > 20) {
      alert('상품명은 20자 이내로 입력 가능합니다.');
      e.currentTarget.value = e.currentTarget.value.slice(0, 20);
    }
  }

  function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  return (
    <input
      onBlur={checkWordsNumber}
      value={title}
      onChange={changeTitle}
      className="grow p-3 ml-2 w-9/12 h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
      type="text"
      placeholder="상품명은 20자까지만 입력 가능합니다."
    />
  );
}
