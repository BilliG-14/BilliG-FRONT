function ButtonDiv() {
  return (
    <div className="w-1/3 h-full">
      <button className="bg-b-yellow mx-auto h-5/6 w-5/6"></button>
    </div>
  );
}

export default function AdminMain() {
  return (
    <div className="max-w-screen-lg bg-slate-200 mx-auto">
      <div className="my-48 h-96 flex bg-green-200">
        <ButtonDiv></ButtonDiv>
        <ButtonDiv></ButtonDiv>
        <ButtonDiv></ButtonDiv>
      </div>
    </div>
  );
}
