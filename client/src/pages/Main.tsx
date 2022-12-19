import MainFirstSection from 'components/main/MainFirstSection';
import MainSecondSection from 'components/main/MainSecondSection';
import MainStepSection from 'components/main/MainStepSection';
import MainButton from 'components/main/MainButton';
import ScrollTopButton from 'components/ScrollTopButton';

export default function Main() {
  return (
    <div className="flex flex-col items-center">
      <MainFirstSection />
      <MainSecondSection />
      <MainStepSection />
      <div className="mt-36 mb-12">
        <MainButton content="물품 빌리러 가기" path="/submain" />
        <MainButton content="물품 빌려주러 가기" path="/submain" />
      </div>
      <ScrollTopButton />
    </div>
  );
}
