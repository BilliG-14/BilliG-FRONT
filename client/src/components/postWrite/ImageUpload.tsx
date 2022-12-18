import { imageUploadStore } from './../../store/PostStore';
import { useState } from 'react';

export default function ImageUpload() {
  const { setImgFile } = imageUploadStore();
  const [fileImage, setFileImage] = useState<string[]>([]);

  // 이미지 갯수 제한(가장 우선), 이미지 크기 제한 구현해야 함
  // 게시글을 볼 때 메인 이미지를 어떻게 정할것인지?
  function imagePreview(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    const files = target.files as FileList;

    // 파일 재선택시 초기화
    setFileImage([]);

    for (let i = 0; i < files.length; i++) {
      setFileImage((cur) => [...cur, URL.createObjectURL(files[i])]);
    }

    setImgFile(files);
  }

  // 미리보기 이미지 클릭 시 해당 이미지 삭제
  function deleteImagehandler(e: React.MouseEvent<HTMLImageElement>) {}

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
              onClick={deleteImagehandler}
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
