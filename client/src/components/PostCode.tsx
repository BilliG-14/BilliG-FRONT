import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Postcode = () => {
  const open = useDaumPostcodePopup();
  const [address, setAddress] = useState(
    '서울시 도봉구 도봉산로 22길 월드컵아파트 201동 1101호',
  );
  const handleComplete = (data: any) => {
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
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <input
      type="text"
      placeholder="주소"
      name="intro"
      onClick={handleClick}
      readOnly
      value={address}
      className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none"
    />
  );
};

export default Postcode;
