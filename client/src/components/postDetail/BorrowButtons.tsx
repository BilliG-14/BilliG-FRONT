import DealDoneModal from './DealDoneModal';
import { ProductReturnedModal } from './ProductReturnedModal';
import { PostIdType } from '../../types/productType';
import { createChatRoom } from '../chat/createChatRoom';
import { ProductReceiveButton } from './ProductReceiveModal';
import { useNavigate } from 'react-router-dom';

// 게시글이 빌리기 상태일때의 버튼들 컴포넌트
export default function BorrowButtons(props: PostIdType) {
  const navigate = useNavigate();
  const { postType, postId, stateNumber, loginedUserId, authorId, lenderId } =
    props;
  /** 채팅하기 클릭 시 작성자 고유id로 채팅방 생성 후 이동 */
  const handleOnclick = async () => {
    if (loginedUserId) {
      await createChatRoom(authorId).then((res) =>
        navigate(`/chat/${res?.data?._id}`),
      );
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      {/* 로그인한 유저가 작성자일 때 */}
      {loginedUserId === authorId ? (
        stateNumber === 0 ? (
          <DealDoneModal
            postType={postType}
            postId={postId}
            stateNumber={stateNumber}
            authorId={authorId}
          />
        ) : (
          <ProductReceiveButton
            postType={postType}
            postId={postId}
            stateNumber={stateNumber}
          />
        )
      ) : // 로그인한 유저가 물품을 빌려주는 유저(대여인)일 때
      loginedUserId === lenderId ? (
        <ProductReturnedModal
          postType={postType}
          postId={postId}
          stateNumber={stateNumber}
        />
      ) : // 로그인한 유저가 차용인/대여인이 아닌 제 3자일 때의 버튼들
      stateNumber === 3 ? (
        <button
          disabled
          className="w-1/2 h-[50px] focus:outline-none disabled:bg-gray-300 text-white  disabled:text-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        >
          거래종료
        </button>
      ) : stateNumber !== 0 ? (
        <button
          disabled
          className="w-1/2 h-[50px] focus:outline-none disabled:bg-gray-300 text-white  disabled:text-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
        >
          거래중
        </button>
      ) : (
        <button
          className="w-1/2 h-[50px] focus:outline-none bg-b-bg-gray hover:bg-b-yellow hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300"
          onClick={handleOnclick}
        >
          채팅하기
        </button>
      )}
    </>
  );
}
