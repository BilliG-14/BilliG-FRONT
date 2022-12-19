import React, { useState } from 'react';

export default function AdminHashTagSection() {
  const initialTags = [
    { _id: '001', content: '애플' },
    { _id: '002', content: '삼성' },
    { _id: '003', content: 'LG' },
    { _id: '004', content: '노트북' },
  ];
  const [tags, setTags] = useState(initialTags);
  const [val, setVal] = useState('');
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setTags((current) => [
      ...current,
      { _id: `00${Math.random() * 10}`, content: val },
    ]);
    setVal('');
  };
  return (
    <section className="w-full text-b-text-black p-2">
      <div className="w-2/3 mx-auto mt-6">
        <form
          action=""
          className="flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-3/5 h-10 border-solid border-2 rounded-lg px-4
        focus:outline-none focus:border-4 mr-2"
            id="title"
            type="text"
            value={val}
            onChange={(e) => setVal(e.currentTarget.value)}
            placeholder="태그명을 입력해주세요"
          ></input>
          <button className="w-1/6 h-10 hover:text-white border-2 border-b-yellow hover:bg-b-yellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm">
            등록하기
          </button>
        </form>
        <div className="mt-8 w-full border-2 border-b-yellow border-solid rounded-lg text-b-hash-text font-extrabold">
          <ul className="flex h-64 py-2 px-4">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="bg-b-yellow h-6 text-b-hash-text px-3 py-1 rounded-lg my-2 mx-1 shadow-lg"
              >
                {tag.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
