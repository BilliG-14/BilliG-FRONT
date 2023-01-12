import { PropsType } from '../../types/productType';

export default function UpdatedImageUpload(props: PropsType) {
  const { bringImgUrlList } = props;

  return (
    <section className="mb-4 flex flex-row ">
      <label
        htmlFor="fileUpload"
        className="inline-block w-[70px] h-[70px] mr-5 pt-4 text-center text-xs border-solid border border-gray-300 hover:border-gray-400 cursor-pointer rounded-lg"
      >
        이미지 <br />
        수정 불가
      </label>
      <div className="flex">
        {bringImgUrlList.map((fileUrl, idx) => {
          return (
            <>
              <img
                key={idx}
                alt="이미지"
                src={fileUrl}
                className="w-[70px] h-[70px] mr-3 border-solid border border-gray-300 rounded-lg object-contain"
              />
            </>
          );
        })}
      </div>
    </section>
  );
}
