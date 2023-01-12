import Footer from 'components/footer/Footer';
import { JoinForm } from 'components/login-join/JoinForm';
import { LoginForm } from 'components/login-join/LoginForm';
import LoginJoinHeader from 'components/login-join/LoginJoinHeader';
import { useLoginJoinStore } from 'store/LoginJoinStore';

export default function LoginJoin() {
  const selectedLogin = useLoginJoinStore((state) => state.selectedLogin);
  return (
    <div className="w-screen relative pb-[70px] min-h-[85vh]">
      <div className="max-w-screen-lg mx-auto">
        <div className="max-w-screen-sm mx-auto mt-4">
          <LoginJoinHeader />
          <div className="w-full">
            {selectedLogin ? <LoginForm /> : <JoinForm />}
          </div>
        </div>
      </div>
      <div className="w-screen mx-auto h-[70px] absolute bottom-0 flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
