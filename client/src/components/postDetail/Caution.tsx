const Caution = () => {
  return (
    <>
      <div>사용시 주의사항</div>
      <div className="mt-3 p-3 w-full h-84 border bg-gray-200 text-b-b-text-black rounded-lg text-xs">
        <div className="font-extrabold">[시간 엄수]</div>
        <p>
          대여 일정을 반드시 지켜주시고 부득이하게 약속을 변경해야 하는
          상황이라면 미리 연락을 취해주세요.
        </p>
        <br />
        <div className="font-extrabold">[파손 및 분실 주의]</div>
        <p>
          빌려주신 분의 소중한 물건을 조심해서 사용해 주세요. 대여 중 파손 및
          고장이 발생하거나 제품을 분실하면 오너에게 적정 비용(수리비, 또는
          아이템 중고가)을 보상하셔야 합니다.
        </p>
        <br />
        <div className="font-extrabold">[기타 주의사항]</div>
        <p>
          1) 제품이 정상적으로 작동좌는지, 그 외 다른 이상은 없는지 빌려주시는
          분과 빌리는 분이 함께 꼼꼼하게 확인한 다음 거래를 시작하고 종료하세요.{' '}
          <br />
          2) 픽업 및 반납 현장에서 제품의 작동 상태나 사용 흔적 등을 동영상 및
          사진으로 기록해두세요. 분쟁 발생 시 근거 자료로 활용될 수 있습니다.
          동영상 및 사진 자료는 타임스탭프로 촬영 시점을 확인할 수 있어야
          합니다.
        </p>
      </div>
    </>
  );
};

export default Caution;
