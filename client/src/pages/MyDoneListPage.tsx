import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import MyDoneList from '../components/myinfo/MyDoneList';

export default function MyDoneGiveListPage() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <Nav />
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <MyDoneList />
        </div>
      </section>
    </div>
  );
}
