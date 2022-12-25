type IconProps = {
  feature: string;
  delay: string;
};
function Icon({ feature, delay }: IconProps) {
  const iconClassName =
    'text-6xl animate-bounce px-4 text-transparent bg-clip-text bg-gradient-to-r from-[#75BC89] to-[#4fb26b]';
  return (
    <i
      className={`fa-solid ${feature} ${iconClassName}`}
      style={{ animationDelay: delay }}
    ></i>
  );
}

export default function PopIconList() {
  return (
    <div className="animate-pop-out w-full flex justify-center">
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
