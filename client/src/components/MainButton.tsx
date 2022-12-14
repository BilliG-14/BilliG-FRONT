export type ButtonProps = {
  content: string;
};
export default function MainButton(props: ButtonProps) {
  return (
    <button className="bg-amber-500 p-5 rounded-2xl w-80 m-5">
      <span className="font-bold">{props.content}</span>
      <i className="fa-solid fa-chevron-right ml-2"></i>
    </button>
  );
}
