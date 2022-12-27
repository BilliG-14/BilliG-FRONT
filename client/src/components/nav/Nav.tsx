import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginJoinStore } from 'store/LoginJoinStore';
// components
import MenuButton from 'components/MenuButton/MenuButton';
import WriteBtns from './WriteBtns';
import GoWriteBtn from './GoWriteBtn';
// react icons
import { FiSearch } from 'react-icons/fi';
import { FaClipboardList } from 'react-icons/fa';
import { RiLoginCircleFill } from 'react-icons/ri';
import { BsFillPersonPlusFill, BsFilePersonFill } from 'react-icons/bs';
function Nav() {
  const [onWriteBtn, setOnWriteBtn] = useState(false);
  const [setSelectedJoin, setSelectedLogin] = useLoginJoinStore((state) => [
    state.setSelectedJoin,
    state.setSelectedLogin,
  ]);
  const navigate = useNavigate();
  const goLogin = () => {
    setSelectedLogin();
    navigate('/login');
  };
  const goSignUp = () => {
    setSelectedJoin();
    navigate('/login');
  };
  const goMyPage = async () => {
    navigate('/login');
  };
  const goSearch = () => {
    navigate('/search');
  };

  return (
    <div className="flex justify-between pr-5 h-40 mt-1 select-none">
      <MenuButton />
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center w-96 text-lg font-semibold">
          <div>
            <button
              type="button"
              className="signup flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={goSignUp}
            >
              <span>
                <BsFillPersonPlusFill className="text-xl mr-1" />
              </span>
              <span className="text-sm ">SIGN UP</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="login flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={goLogin}
            >
              <span>
                <RiLoginCircleFill className="text-xl mr-1" />
              </span>
              <span className="text-sm">LOGIN</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="mypage flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={() => {
                navigate('/notices');
              }}
            >
              <span>
                <FaClipboardList className="text-xl mr-1" />
              </span>
              <span className="text-sm">NOTICE</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="mypage flex hover:text-b-yellow hover:scale-110 ease-in-out duration-300"
              onClick={goMyPage}
            >
              <span>
                <BsFilePersonFill className="text-xl mr-1" />
              </span>
              <span className="text-sm">MY PAGE</span>
            </button>
          </div>
        </div>
        <div className="flex justify-end text-3xl mt-5">
          {onWriteBtn ? (
            <WriteBtns setOnWriteBtn={setOnWriteBtn} />
          ) : (
            <GoWriteBtn setOnWriteBtn={setOnWriteBtn} />
          )}

          <button
            type="button"
            className="search hover:text-b-yellow hover: ease-in-out duration-300"
            onClick={goSearch}
          >
            <FiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Nav;
