/*
title : 작성할 내용
onClickToggleModal : 모달창 여부를 토글하기 위한  setState 함수

onClickYes : 확인 버튼을 누르면 실행할 함수 (디폴트 : 모달창 닫기)
content: 모달 중간에 표시할 텍스트 (디폴트 :없음);
yesText: 확인 버튼에 들어갈 텍스트 (디폴트 : 확인);
yesColor: 확인 버튼에 들어갈 색상 (tailwind처럼 red-400 이런 식으로 넣음) (디폴트 : blue-400)
onlyYes : true로 할 경우, 취소버튼이 보이지 않음

모달창을 여는 컴포넌트에 다음 코드를 추가하고 onClickToggleModal 속성에 넣어주세요
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
*/
interface ConfirmModalProps {
  title: string;
  onClickToggleModal: () => void;
  onClickYes?: () => void;
  content?: string;
  yesText?: string;
  yesColor?: string;
  onlyYes?: boolean;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const buttonColor = props.yesColor
    ? `border-${props.yesColor} text-${props.yesColor} hover:bg-${props.yesColor} hover:text-white`
    : ` border-blue-400  text-blue-400 hover:bg-blue-400 hover:text-white`;

  const handleClickYes = () => {
    if (props.onClickYes) {
      props.onClickYes();
    }
    props.onClickToggleModal();
  };
  const handleEnter = (e: React.KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      handleClickYes();
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 text-b-text-black break-keep">
      <div className="w-[400px] flex flex-col bg-white fixed rounded-xl shadow-2xl z-50 animate-fade-in-150ms">
        <div className="py-3 px-3 border-b border-solid border-gray-200 flex items-center justify-center">
          <span className="font-bold text-lg">{props.title}</span>
        </div>
        {props.content && (
          <div className="p-6 flex items-center justify-center">
            <span className="font-semibold">{props.content}</span>
          </div>
        )}
        <div className="flex justify-center h-12 items-center">
          {!props.onlyYes && (
            <button
              className={`w-20 h-8 font-bold border-gray-400 border-2 text-gray-400 rounded-lg mr-3 hover:bg-gray-400 hover:text-white`}
              onClick={props.onClickToggleModal}
            >
              취소
            </button>
          )}
          <button
            className={`w-20 h-8 font-bold border-2 rounded-lg ${buttonColor}`}
            onClick={handleClickYes}
            autoFocus
          >
            {props.yesText ? props.yesText : '확인'}
          </button>
        </div>
      </div>
      <div
        className="w-screen h-screen bg-black -z-50 opacity-10"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          props.onClickToggleModal();
        }}
      ></div>
    </div>
  );
}
