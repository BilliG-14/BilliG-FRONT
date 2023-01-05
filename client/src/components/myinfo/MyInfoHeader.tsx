import React from 'react';

export default function MyInfoHeader() {
  return (
    <>
      <a href="/mypage">
        <p className="max-w-screen-lg mx-auto px-5 py-3 text-4xl font-extrabold">
          My Info
        </p>
      </a>
      <hr className="border-2 border-b-text-black max-w-screen-lg mx-auto"></hr>
    </>
  );
}
