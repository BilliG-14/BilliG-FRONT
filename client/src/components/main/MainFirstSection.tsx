export default function MainFirstSection() {
  return (
    <section className="w-screen mb-56 font-semibold relative">
      <div className="max-w-screen-lg mx-auto text-center text-b-text-black dark:text-white font-bold mt-8 pt-36 px-16 pb-44 relative">
        <p className="text-5xl animate-fade-in z-20">무엇이든 쉽게 빌리자</p>
        <a href="/submain">
          <p className="text-7xl mt-3 animate-fade-in z-20">
            대여플랫폼 빌리지
          </p>
        </a>
        <p className="text-2xl mt-4 font-medium animate-fade-in z-20">
          <span className="text-blue-400">직접대여</span>
          <span className="text-gray-300"> X </span>
          <span className="text-amber-500">택배대여</span>
          <span className="text-gray-300"> X </span>
          <span className="text-lime-600">채팅</span>
        </p>
        <div className="w-36 h-36 rounded-full bg-gradient-to-b from-[#008FB2] to-[#0575E6] absolute top-8 left-12 z-10 shadow-2xl animate-center-to-lt"></div>
        <div className="w-32 h-32 rotate-12 bg-gradient-to-r from-b-yellow to-[#f7b733] absolute z-10 bottom-0 left-36 shadow-2xl animate-center-to-lb"></div>
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#76B875] to-[#bfb73b] absolute bottom-8 right-28 z-10 shadow-2xl animate-center-to-rb"></div>
        <div className="w-32 h-32 rotate-45 bg-gradient-to-r from-[#ff9966] to-[#ff5e62] absolute top-6 right-28 z-10 shadow-2xl animate-center-to-rt"></div>
      </div>
    </section>
  );
}
