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
