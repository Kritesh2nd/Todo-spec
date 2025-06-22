import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Hero from "./Hero";
import ListContainer from "./ListContainer";
import ListBottom from "./ListBottom";
import { GoPlus } from "react-icons/go";
import CreateTask from "./CreateTask";

const ListBody = () => {
  const { properties } = useTheme();

  const [createTaskDisplay, setCreateTaskDisplay] = useState<boolean>(false);

  const toggleTaskDisplay = () => {
    setCreateTaskDisplay((prev) => !prev);
  };

  return (
    <div className={`flex justify-center items-center h-[100vh] ${properties}`}>
      <div
        className={`flex flex-col relative h-full w-full sm:h-[70%] sm:w-[26%] border border-stone-400  overflow-hidden `}
      >
        <section className="grow-3 sm:grow-4 basis-0 overflow-hidden">
          <Hero />
        </section>
        <section className="grow-7 basis-0 overflow-auto">
          <ListContainer />
        </section>
        <section className="grow-1 basis-0 overflow-hidden ">
          <ListBottom />
        </section>
        <div className="flex justify-center items-center absolute bottom-14 right-7 h-14 w-14 rounded-full border border-stone-300 bg-white cursor-pointer shadow hover:bg-stone-100 transition-all duration-300 ease-in-out">
          <div className="" onClick={toggleTaskDisplay}>
            <GoPlus size={26} />
          </div>
        </div>
        <div
          className={`absolute h-full w-full bg-white z-40 transition-all duration-300 ease-in-out ${
            createTaskDisplay ? "left-[0%]" : "left-[100%]"
          }`}
        >
          <CreateTask toggleTaskDisplay={toggleTaskDisplay} />
        </div>
      </div>
    </div>
  );
};

export default ListBody;
