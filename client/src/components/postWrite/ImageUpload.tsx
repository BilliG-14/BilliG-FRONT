interface PropsType {
  fileUploadHandler: React.ChangeEvent<HTMLInputElement>;
}

export default function ImageUpload({
  fileUploadHandler,
}: {
  fileUploadHandler: PropsType;
}) {
  return (
    <section className="mb-4">
      <input
        onChange={fileUploadHandler}
        type="file"
        accept="image/jpeg,"
        multiple
        className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              cursor-pointer
              file:bg-b-bg-gray file:text-b-text-black
              hover:file:bg-gray-200
              file:cursor-pointer"
      />
      <div>
        사진등록시 사진 추가될 영역
        <img alt="이미지" />
      </div>
    </section>
  );
}
