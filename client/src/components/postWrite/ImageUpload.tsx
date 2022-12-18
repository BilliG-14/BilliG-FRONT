import { imageUploadStore } from './../../store/PostStore';
import { useState, useRef } from 'react';

export default function ImageUpload() {
  // const imgPreview = useRef<HTMLImageElement>(null);

  const { setimgFile } = imageUploadStore();

  /**
   * 파일 선택 onChangeHandler
   * 해당 method에서는 업로드할 파일에대해서 validaion을 하고
   * file state에 값을 할당한다
   */

  const [fileImage, setFileImage] = useState<string[]>([]);

  // 이미지 갯수 제한(가장 우선), 이미지 크기 제한 구현해야 함
  // 메인 이미지를 어떻게 구현하나?

  function imagePreview(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    const files = target.files as FileList;

    // 파일 재선택시 초기화
    setFileImage([]);

    for (let i = 0; i < files.length; i++) {
      setFileImage((cur) => [...cur, URL.createObjectURL(files[i])]);
    }

    setimgFile(files);
  }

  return (
    <section className="mb-4">
      <input
        onChange={imagePreview}
        type="file"
        accept="image/*"
        multiple
        className="block w-[500px] text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold cursor-pointer file:bg-b-bg-gray file:text-b-text-black  hover:file:bg-gray-200 file:cursor-pointer"
      />
      <div className="flex flex-row mt-3 ml-24">
        {fileImage.map((fileUrl) => {
          return (
            <img
              key={fileUrl}
              alt="이미지"
              src={fileUrl}
              className="w-20 h-20 mr-2 border-solid border border-gray-300"
            />
          );
        })}
      </div>
    </section>
  );
}
