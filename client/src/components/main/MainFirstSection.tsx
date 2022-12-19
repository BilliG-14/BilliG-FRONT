export default function MainFirstSection() {
  const iconClassName =
    'text-6xl animate-bounce px-4 text-transparent bg-clip-text bg-gradient-to-r from-b-yellow to-[#ff834e]';
  return (
    <section className="max-w-screen-lg mb-80 font-semibold">
      <div className="text-left p-32 pt-44 animate-fade-in text-b-text-black">
        <p className="text-4xl">물건을 빌리는 가장 쉬운 방법</p>
        <p className="text-6xl">초간편 물품 대여 중계 플랫폼</p>
        <a href="/submain">
          <p
            className="text-6xl bg-b-yellow font-extrabold transition-all
          text-transparent bg-clip-text hover:bg-gradient-to-r from-[#fe8c00] to-[#f83600]"
          >
            빌리지
          </p>
        </a>
      </div>
      <div className="px-32 pt-16 animate-pop-out">
        <i className={`fa-solid fa-shirt ${iconClassName}`}></i>
        <i
          className={`fa-solid fa-camera-retro ${iconClassName}`}
          style={{ animationDelay: '100ms' }}
        ></i>
        <i
          className={`fa-solid fa-laptop ${iconClassName}`}
          style={{ animationDelay: '200ms' }}
        ></i>
        <i
          className={`fa-solid fa-headphones ${iconClassName}`}
          style={{ animationDelay: '300ms' }}
        ></i>
        <i
          className={`fa-solid  fa-bag-shopping ${iconClassName}`}
          style={{ animationDelay: '400ms' }}
        ></i>
        <i
          className={`fa-solid  fa-bicycle ${iconClassName}`}
          style={{ animationDelay: '500ms' }}
        ></i>
        <i
          className={`fa-solid  fa-gamepad ${iconClassName}`}
          style={{ animationDelay: '600ms' }}
        ></i>
      </div>
    </section>
  );
}
