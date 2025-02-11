import AlienBlue from "@/assets/images/icons/blue.svg";
import Earth from "@/assets/images/icons/earth.svg";
import AlienPink from "@/assets/images/icons/pink.svg";
import Planet from "@/assets/images/icons/planet-color.svg";
import AlienPurple from "@/assets/images/icons/purple.svg";
import Spacecraft from "@/assets/images/icons/spacecraft-sec.svg";
import AlienYellow from "@/assets/images/icons/yellow.svg";

export default function BackgroundAlien() {
  return (
    <div className='fixed left-0 top-0 -z-[1] hidden h-full w-full overflow-hidden desktop:block'>
      <AlienPink
        className='absolute bottom-1/2 left-9 translate-y-1/2 rotate-[15deg]'
        style={{
          background:
            "radial-gradient(ellipse at center, #62373E 0%, #62373E1A 50%, transparent 70%)",
        }}
      />

      <AlienBlue
        className='absolute bottom-28 right-0 -rotate-[15deg]'
        style={{
          background:
            "radial-gradient(ellipse at center, #4F4F4F 0%, #4F4F4F1A 60%, transparent 70%)",
        }}
      />

      <AlienPurple
        className='absolute -bottom-20 left-44 -rotate-[15deg]'
        style={{
          background:
            "radial-gradient(ellipse at center, #6E5770 0%, #6E57701A 60%, transparent 70%)",
        }}
      />

      <AlienYellow
        className='absolute -bottom-14 right-52'
        style={{
          background:
            "radial-gradient(ellipse at center, #4F4F4F 0%, #4F4F4F1A 60%, transparent 70%)",
        }}
      />

      <div
        className='absolute -right-14 bottom-1/2 translate-y-1/2 p-8'
        style={{
          background:
            "radial-gradient(ellipse at center, #4F4F4F 0%, #4F4F4F1A 50%, transparent 70%)",
        }}
      >
        <Earth />
      </div>

      <Planet
        className='absolute bottom-20 left-12 -rotate-[30deg]'
        style={{
          background:
            "radial-gradient(ellipse at center, #4A4A4A 0%, #4A4A4A1A 60%, transparent 70%)",
        }}
      />

      <Spacecraft
        className='absolute right-32 top-24 rotate-[15deg]'
        style={{
          background:
            "radial-gradient(ellipse at center, #4F4F4F 0%, #4F4F4F1A 60%, transparent 70%)",
        }}
      />
    </div>
  );
}
