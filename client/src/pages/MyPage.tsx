import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import Nav from '../components/nav/Nav';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';

export default function MyPage() {
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      <Nav />
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <div className="w-4/5 p-12">
            <section className="flex">
              <div className="flex flex-col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0AqtMahULe4ViGKzXbAr4C4hel5SGwfl7Pg&usqp=CAU"
                  alt="조이현"
                  className="rounded-full h-40 w-40 object-cover"
                />
                <button className="">이미지 업로드</button>
                <button>기본 이미지</button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
