import MainFirstSection from 'components/main/MainFirstSection';
import MainSecondSection from 'components/main/MainSecondSection';
import MainStepSection from 'components/main/MainStepSection';
import MainButton from 'components/main/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';
import Nav from 'components/nav/Nav';

export default function Main() {
  return (
    <div className="flex flex-col items-center select-none">
      <MainFirstSection />
      <MainSecondSection />
      <MainStepSection />
      <div className="mb-12 text-lg hover:font-extrabold">
        <MainButton content="물품 빌리러 가기" path="/submain/lend" />
        <MainButton content="물품 빌려주러 가기" path="/submain" />
      </div>
      <ScrollTopButton />
    </div>
  );
}
