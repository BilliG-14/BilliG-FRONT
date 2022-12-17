import React from 'react';
import Category from 'components/category-submain/Category';
import Carousels from 'components/category-submain/Carousels';
import Nav from '../components/nav/Nav';
import ChatIcon from '../components/chat-icon/ChatIcon';
import Footer from '../components/footer/Footer';
export default function Submain() {
  return (
    <div>
      <div className="w-screen max-w-screen-lg m-auto">
        <Nav />
      </div>
      <Carousels />
      <Category />
      <ChatIcon />
      <Footer />
    </div>
  );
}
