import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import Nav from '../components/nav/Nav';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';

export default function MyInfo() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <Nav />
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <div className="w-4/5">메인</div>
        </div>
      </section>
    </div>
  );
}
