import mountains from "../assets/mountains.jpg";
import { HiBars3BottomLeft } from "react-icons/hi2";
const Hero = () => {
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex h-full w-full relative text-white p-6">
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden z-0">
        <img src={mountains} className="h-full w-full" />
      </div>
      <div className="absolute left-0 bottom-0 h-[5px] w-full bg-stone-400 opacity-70"></div>
      <div className="absolute left-0 bottom-0 h-[5px] w-[50%] bg-stone-100 opacity-80"></div>
      <div className="flex w-full z-30">
        <div className="flex flex-col justify-between grow-3 basis-0  ">
          <div className="pb-2">
            <HiBars3BottomLeft size={34} />
          </div>
          <div className="flex-1 text-white text-4xl tracking-wider font-light">
            TODO LIST
          </div>
          <div className="text-xs text-stone-200 py-5 tracking-widest">
            {formattedDate}
          </div>
        </div>
        <div className="grow-2 basis-0  "></div>
      </div>
    </div>
  );
};

export default Hero;
