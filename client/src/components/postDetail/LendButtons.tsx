import DealDoneModal from './DealDoneModal';
import { ProductReturnedModal } from './ProductReturnedModal';
import { PostIdType } from './../../store/PostReadStore';
import { ProductReceiveButton } from './ProductReceiveModal';

export default function LendButtons(props: PostIdType) {
  const { postType, postId, stateNumber, loginedUserId, authorId, borrowerId } =
    props;
  return (
    <>
      {loginedUserId === authorId ? (
        stateNumber === 0 ? (
          <DealDoneModal
            postType={postType}
            postId={postId}
            stateNumber={stateNumber}
          />
        ) : (
          // : stateNumber === 3 ? (
          //   <ProductReturnedModal
          //     postType={postType}
          //     postId={postId}
          //     stateNumber={stateNumber}
          //   />
          // )
          <ProductReturnedModal
            postType={postType}
            postId={postId}
            stateNumber={stateNumber}
          />
        )
      ) : loginedUserId === borrowerId ? (
        <ProductReceiveButton
          postType={postType}
          postId={postId}
          stateNumber={stateNumber}
        />
      ) : stateNumber === 3 ? (
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
