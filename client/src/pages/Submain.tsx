import React from 'react';
import Category from 'components/category-submain/Category';
import Carousels from 'components/category-submain/Carousels';
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
export default function Submain() {
  return (
    <>
      <Nav />
      <Carousels />
      <Category />
      <Footer />
    </>
  );
}
