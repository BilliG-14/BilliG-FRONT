export type ButtonProps = {
  content: string;
};
export default function MainButton(props: ButtonProps) {
  return (
    <button className="bg-amber-500 p-3 rounded-lg w-40">
      {props.content}
    </button>
  );
}
