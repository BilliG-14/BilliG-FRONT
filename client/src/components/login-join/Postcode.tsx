import { useState } from 'react';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import useJoinFormStore from 'store/JoinFormStore';

export default function Postcode() {
  const labelClassName =
    'block text-b-yellow font-bold text-lg w-full my-auto text-left mt-1 ';
  const inputClassName =
    'block w-full h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold focus:outline-none focus:border-4 mb-2';

  const joinFormState = useJoinFormStore();
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
    joinFormState.setPostalCode(data.zonecode);
    joinFormState.setAddress1(data.address);
  };

  const handleAddressClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleAddressClick}
        className="h-9 w-24 my-2 text-b-yellow font-bold text-lg leading-7 border-2 border-b-yellow rounded-lg shadow-xl hover:bg-b-yellow hover:text-white self-start"
      >
        주소 검색
      </button>
      <label htmlFor="postalCode" className={labelClassName}>
        우편번호
      </label>
      <input
        id="postalCode"
        name="postalCode"
        className={inputClassName}
        readOnly
        value={address.postCode}
      />

      <label htmlFor="address1" className={labelClassName}>
        주소
      </label>
      <input
        id="address1"
        name="address1"
        className={inputClassName}
        readOnly
        value={address.address1}
      />
    </>
  );
}
