type IconProps = {
  feature: string;
  delay: string;
};
function Icon({ feature, delay }: IconProps) {
  const iconClassName =
    'text-6xl animate-bounce px-4 text-transparent bg-clip-text bg-gradient-to-r from-b-yellow to-[#ff834e]';
  return (
    <i
      className={`fa-solid ${feature} ${iconClassName}`}
      style={{ animationDelay: delay }}
    ></i>
  );
}

function Icons() {
  return (
    <div className="px-32 pt-16 animate-pop-out">
      <Icon feature="fa-shirt" delay="0" />
      <Icon feature="fa-camera-retro" delay="100ms" />
      <Icon feature="fa-laptop" delay="200ms" />
      <Icon feature="fa-headphones" delay="300ms" />
      <Icon feature="fa-bag-shopping" delay="400ms" />
      <Icon feature="fa-bicycle" delay="500ms" />
      <Icon feature="fa-gamepad" delay="600ms" />
    </div>
  );
}

export default function MainFirstSection() {
  return (
    <section className="max-w-screen-lg mb-80 font-semibold">
      <div className="text-left p-32 pt-44 animate-fade-in text-b-text-black">
        <p className="text-4xl">물건을 빌리는 가장 쉬운 방법</p>
        <p className="text-6xl">초간편 물품 대여 중계 플랫폼</p>
        <a href="/submain/lend">
          <p
            className="text-6xl bg-b-yellow font-extrabold transition-all
          text-transparent bg-clip-text hover:bg-gradient-to-r from-[#fe8c00] to-[#f83600]"
          >
            빌리지
          </p>
        </a>
      </div>
      <Icons />
    </section>
  );
}
