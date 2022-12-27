import DealDoneModal from './DealDoneModal';
import { ProductReturnedModal } from './ProductReturnedModal';
import { PostIdType } from './../../store/PostReadStore';
import { ProductReceiveButton } from './ProductReceiveModal';

// 게시글이 빌려주기 상태일때의 버튼들 컴포넌트
export default function LendButtons(props: PostIdType) {
  const { postType, postId, stateNumber, loginedUserId, authorId, borrowerId } =
    props;
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
          <ProductReturnedModal
            postType={postType}
            postId={postId}
            stateNumber={stateNumber}
          />
        )
      ) : // 로그인한 유저가 물품을 빌리는 유저(차용인)일 때
      loginedUserId === borrowerId ? (
        <ProductReceiveButton
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
        <button className="w-1/2 h-[50px] focus:outline-none bg-b-bg-gray hover:bg-b-yellow hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
          채팅하기
        </button>
      )}
    </>
  );
}
