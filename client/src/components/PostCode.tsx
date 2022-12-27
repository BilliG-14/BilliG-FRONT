import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
interface AddressPropsType {
  address1Ref: React.ForwardedRef<HTMLInputElement | null>;
  address1: string;
}
const Postcode = ({ address1Ref, address1 }: AddressPropsType) => {
  const [address, setAddress] = useState(address1);

  const open = useDaumPostcodePopup();
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
      setAddress(fullAddress);
    }
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
      ref={address1Ref}
      value={address}
      readOnly
      className="w-3/5 font-medium border border-solid border-gray-300 py-2 px-2 rounded-lg focus:border-b-yellow focus:outline-none"
    />
  );
};

export default Postcode;
