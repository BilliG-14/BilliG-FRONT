import { imageUploadStore } from './../../store/PostWriteStore';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import api from 'api/customAxios';

interface PreviewImg {
  pictureName: string;
  URL: string;
}

interface PropsType {
  bringImgUrlList: string[];
}

export default function UpdatedImageUpload(props: PropsType) {
  const { bringImgUrlList } = props;
  const { imgFiles, setImgFile } = imageUploadStore();
  const [previewImages, setPreviewFileImages] = useState<PreviewImg[]>([]);

  // 서버에서 받아온 이미지들 프리뷰로 보여주기
  //   setServerPreviewImgs(bringImgUrlList);

  // 이미지 갯수 제한(가장 우선)(구현완료), 이미지 크기 제한 구현 예정
  // 게시글을 볼 때 메인 이미지를 어떻게 정할것인지?

  function imagePreview(e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.currentTarget;
    // 유사배열 객체를 Array로 변환
    const files = Array.from(target.files as FileList);

    setPreviewFileImages([]);

    if (files.length > 3) {
      alert('이미지는 최대 3개까지만 등록 가능합니다. ');
      return;
    } else {
      for (let i = 0; i < files.length; i++) {
        setPreviewFileImages((state) => [
          ...state,
          { pictureName: files[i].name, URL: URL.createObjectURL(files[i]) },
        ]);
      }

      setImgFile(files);
    }
  }

  // 미리보기 이미지 클릭 시 해당 이미지 삭제
  function deleteImagehandler(e: React.MouseEvent<HTMLDivElement>) {
    const previewImgId = e.currentTarget.id;
    const newFiles = imgFiles.filter(
      (imgfile) => imgfile.name !== previewImgId,
    );
    const newPreviewFiles = previewImages.filter(
      (imgfile) => imgfile.pictureName !== previewImgId,
    );

    setImgFile(newFiles);
    setPreviewFileImages(newPreviewFiles);
  }

  return (
    <section className="mb-4 flex flex-row ">
      <label
        htmlFor="fileUpload"
        // className="inline-block w-[70px] h-[70px] mr-5 text-center text-xs border-solid border border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg"
        className="inline-block w-[70px] h-[70px] mr-5 pt-4 text-center text-xs border-solid border border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg"
      >
        {/* <AiFillCamera className="w-6 h-6 mx-auto mt-3.5 mb-[2px]" />
        <div className="text-gray-400">{bringImgUrlList.length} / 3</div> */}
        이미지 <br />
        수정 불가
      </label>
      <input
        onChange={imagePreview}
        type="file"
        id="fileUpload"
        accept="image/*"
        multiple
        className="w-0 h-0 p-0 overflow-visible"
        disabled
      />
      <div className="flex">
        {bringImgUrlList.map((fileUrl, idx) => {
          return (
            <>
              <img
                key={fileUrl}
                alt="이미지"
                src={fileUrl}
                className="w-[70px] h-[70px] mr-3 border-solid border border-gray-300 rounded-lg"
              />
              {/* <div
                id={fileUrl}
                key={idx}
                onClick={deleteImagehandler}
                className="relative w-5 h-5 bg-b-text-black rounded-full right-3 text-white text-center text-sm cursor-pointer"
              >
                x
              </div> */}
            </>
          );
        })}
      </div>
    </section>
  );
}
