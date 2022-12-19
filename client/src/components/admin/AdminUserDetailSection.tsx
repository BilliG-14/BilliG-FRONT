type User = {
  _id: string;
  image: string;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  reportNumber: number;
};
const userData: User = {
  _id: 'auth_1234',
  image:
    'https://lh3.googleusercontent.com/a/AEdFTp5DA_bYK75iaBrz6GCRkCRPROTdal4uqaG13egzFdk=s96-c-rg-br100',
  email: 'user@gmail.com',
  nickName: '빌리지관리자',
  password: 'barobaroloan123#',
  phoneNumber: '010-1234-1234',
  postalCode: '12345',
  address1: '서울시 성북구 가나다라',
  address2: '빌리지 1201호',
  reportNumber: 1,
};
export default function AdminUserDetailSection() {
  return (
    <section className="w-full text-b-text-black">
      <img src={userData.image} />
    </section>
  );
}
