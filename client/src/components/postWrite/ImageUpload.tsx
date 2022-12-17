import { imageUploadStore } from './../../store/PostStore';

export default function ImageUpload() {
  const { setimgFile } = imageUploadStore();

  /**
   * 파일 선택 onChangeHandler
   * 해당 method에서는 업로드할 파일에대해서 validaion을 하고
   * file state에 값을 할당한다
   */

  // 이미지 갯수 제한(가장 우선), 이미지 크기 제한 구현해야 함
  function fileUploadHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    const files = target.files as FileList;

    setimgFile(files);
  }

  return (
    <section className="mb-4">
      <input
        onChange={fileUploadHandler}
        type="file"
        accept="image/jpeg, image/png"
        multiple
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold cursor-pointer file:bg-b-bg-gray file:text-b-text-black  hover:file:bg-gray-200 file:cursor-pointer"
      />
      <div>
        사진등록시 사진 추가될 영역
        <img alt="이미지" />
      </div>
    </section>
  );
}
