export type ButtonProps = {
  content: string;
};
export default function MainButton(props: ButtonProps) {
  return (
    <button className="bg-amber-500 p-3 rounded-2xl w-80 m-5">
      <p className="font-bold">{props.content}</p>
    </button>
  );
}
