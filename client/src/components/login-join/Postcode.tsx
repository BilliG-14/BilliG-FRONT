import { useState } from 'react';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';

const Postcode = () => {
  const open = useDaumPostcodePopup();
  const [address, setAddress] = useState({
    postCode: '',
    address1: '',
  });
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress, '   ', data.zonecode);
    setAddress({ postCode: data.zonecode, address1: fullAddress });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="h-9 w-24 my-2 text-b-yellow font-bold text-lg leading-7 border-2 border-b-yellow rounded-lg shadow-xl hover:bg-b-yellow hover:text-white"
      >
        주소 검색
      </button>
      <div className="w-full flex flex-col justify-center items-center mb-1">
        <label
          htmlFor="postalCode"
          className="block text-b-yellow font-bold text-lg w-full my-auto text-left"
        >
          우편번호
        </label>
        <input
          id="postalCode"
          name="postalCode"
          className="block w-full h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold bg-gray-300 focus:outline-none"
          readOnly
          value={address.postCode}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center mb-1">
        <label
          htmlFor="address1"
          className="block text-b-yellow font-bold text-lg w-full my-auto text-left"
        >
          주소
        </label>
        <input
          id="address1"
          name="address1"
          className="block w-full h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold bg-gray-300 focus:outline-none"
          readOnly
          value={address.address1}
        />
      </div>
    </>
  );
};

export default Postcode;
