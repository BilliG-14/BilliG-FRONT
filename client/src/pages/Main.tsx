import MainButton from 'components/MainButton';
import React from 'react';

export default function Main() {
  return (
    <>
      <div>
        <p className="text-2xl">물건을 빌리는 가장 쉬운 방법</p>
        <h1>초간편 물품 대여 중계 플랫폼</h1>
        <h1>빌리지</h1>
      </div>
      <div>
        빌리지로 물품 대여 시간과 비용을 절약하세요! 최대 65% 절감 효과!
      </div>
      <div>
        step 1. 빌려 주실 물품의 사진과 이름, 대여 비용과 상세 설명을
        작성해주세요!
      </div>
      <div>step 2. 물품을 빌려가실 때, 상대방에게 바로 대화를 걸어보세요!</div>
      <div>
        step 3. 물품을 빌려가실 때, 대여기간을 설정한 후 대여 요청을 보내주세요!
      </div>
      <div>step 4. 대여하신 물품은 깨끗하게 사용하시고 반납해주세요</div>
      <MainButton content="물품 빌리러 가기!" />
      <MainButton content="물품 빌려주러 가기!" />
    </>
  );
}
