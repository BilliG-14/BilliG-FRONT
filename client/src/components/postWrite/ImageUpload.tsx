import { useState, ChangeEvent } from 'react';

export default function ImageUpload() {
  const [imgFiles, setImgFile] = useState<FileList>();

  const [previewImages, setPreviewImages] = useState<
    {
      imgId: string;
      imgUrl: string;
    }[]
  >([]);

  // 이미지 갯수 제한(가장 우선), 이미지 크기 제한, 첨부파일 삭제 구현
  // 게시글을 볼 때 메인 이미지를 어떻게 정할것인지?
  function imagePreview(e: ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    const files = target.files as FileList;

    // 파일 재선택시 초기화
    setPreviewImages([]);

    for (let i = 0; i < files.length; i++) {
      setPreviewImages((cur) => [
        ...cur,
        { imgId: files[i].name, imgUrl: URL.createObjectURL(files[i]) },
      ]);
    }

    setImgFile(files);
  }
  console.log(imgFiles);

  // 미리보기 이미지 클릭 시 해당 이미지 삭제
  // function deleteImagehandler(e: React.MouseEvent<HTMLImageElement>) {
  //   console.log(imgFiles);
  // }
  // setImgFile(null);

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
        {previewImages.map((fileUrl, idx) => {
          return (
            <img
              key={fileUrl.imgId}
              alt="이미지"
              src={fileUrl.imgUrl}
              className="w-20 h-20 mr-2 border-solid border border-gray-300 cursor-pointer"
            />
          );
        })}
        {/* {imgFiles ? (
          <div className="w-9 h-6 text-[8px] text-slate-500 text-center py-2 px-2 rounded-md border-0 font-semibold cursor-pointer bg-b-bg-gray">
            삭제
          </div>
        ) : null} */}
      </div>
    </section>
  );
}
