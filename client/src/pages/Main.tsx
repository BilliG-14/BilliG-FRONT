import MainFirstSection from 'components/main/MainFirstSection';
import MainSecondSection from 'components/main/MainSecondSection';
import MainThirdSection from 'components/main/MainThirdSection';
import MainButton from 'components/main/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import Footer from 'components/footer/Footer';
import DarkToggle from 'components/DarkToggle';

export default function Main() {
  return (
    <div className="w-screen mx-auto">
      <MainFirstSection />
      <MainSecondSection />
      <MainThirdSection />
      <div className="max-w-screen-lg mx-auto flex justify-center text-lg hover:font-extrabold pb-16">
        <MainButton content="물품 빌리러 가기" path="/submain" />
        <MainButton content="물품 빌려주러 가기" path="/submain/borrow" />
      </div>
      <Footer />
      <ScrollTopButton />
      <DarkToggle />
    </div>
  );
}
