import React from 'react';
import Category from 'components/category-submain/Category';
import Carousels from 'components/category-submain/Carousels';
import Nav from '../components/nav/Nav';
import ChatIcon from '../components/chat-icon/ChatIcon';
export default function Submain() {
  return (
    <>
      <Nav />
      <Carousels />
      <Category />
      <ChatIcon />
    </>
  );
}
