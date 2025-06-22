import { useEffect } from "react";
import { updateTask, useTask } from "../context/TaskContext";

const ListBottom = () => {
  const { taskListComplete } = useTask();
  const { getCompltedTask } = updateTask();

  useEffect(() => {
    getCompltedTask();
  }, []);

  return (
    <div className="flex  h-full w-full  px-6 ">
      <div className="flex flex-col h-full w-full relative pt-3">
        <span className="absolute h-[1px] w-full left-0 top-0 bg-stone-300"></span>
        <div className="flex gap-2 items-center tracking-wider font-normal text-md">
          COMPLETED
          <span className="text-xs flex justify-center items-center h-5 w-5 bg-stone-400 text-white rounded-full">
            <span className="">
              {taskListComplete && taskListComplete.length}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListBottom;
