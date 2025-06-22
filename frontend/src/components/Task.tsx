import { useState } from "react";
import type { TaskType } from "../type";
import { CiTrash } from "react-icons/ci";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { iconList } from "../constant/index";
import { updateTask } from "../context/TaskContext";

const Task = ({
  id,
  title,
  description,
  icon,
  completed,
  completion_date_time,
}: TaskType) => {
  const { taskSetComplete, taskSetIncomplete, taskDelete } = updateTask();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [positionChange, setPositionChange] = useState<boolean>(false);

  const toggleClick = () => {
    setClicked((prev) => !prev);
  };

  const handleMouseDown = () => {
    setStartTime(Date.now());
  };

  const handleMouseUp = () => {
    if (startTime) {
      const duration = Date.now() - startTime;
      if (duration > 600) {
        setPositionChange((prev) => !prev);
      } else {
        toggleClick();
      }
      setStartTime(null);
    }
  };

  const handelTime = () => {
    const date = new Date(completion_date_time);

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const formattedTime = date.toLocaleTimeString("en-US", options);
    return formattedTime;
  };

  const handelTaskIcon = () => {
    const iconItem = iconList.filter((item) => item.name == icon);
    return iconItem[0].icon;
  };

  const handelTaskComplete = () => {
    if (completed) {
      taskSetIncomplete(id);
    } else {
      taskSetComplete(id);
    }
  };

  const handelTaskDelete = () => {
    taskDelete(id);
  };

  return (
    <div className={` flex relative `}>
      <div
        className={`${
          completed ? "bg-gray-200" : ""
        } flex w-full overflow-hidden transition-all duration-300 px-6 pt-2 bor`}
      >
        <div
          className={`flex gap-3 w-full transition-all duration-300 ease-out 
            ${clicked ? "-ml-28" : "ml-0"} 
            `}
        >
          <div className="w-14 ">
            <div className="flex justify-center items-center h-14 w-14 rounded-full text-3xl">
              {handelTaskIcon()}
            </div>
          </div>
          <div
            className="flex flex-col flex-9 basis-0 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="tracking-wide font-medium">{title}</div>
            <div className="tracking-wider font-extralight text-sm">
              {description}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-14 ">
            <div className="text-xs tracking-wider text-stone-600">
              {handelTime()}
            </div>
          </div>
        </div>
        <div className="w-28 h-full bor -mr-28 pl-3">
          <div className="flex justify-center items-center h-full w-full ">
            <div
              className={`flex flex-1 basis-0 justify-center ${
                completed ? "text-blue-800" : "text-blue-300"
              } `}
            >
              <IoCheckmarkDoneCircleOutline
                size={20}
                className=" cursor-pointer"
                onClick={handelTaskComplete}
              />
            </div>
            <div className="flex flex-1 basis-0 justify-center text-red-800">
              <CiTrash
                size={20}
                className=" cursor-pointer"
                onClick={handelTaskDelete}
              />
            </div>
          </div>
        </div>
      </div>
      <span className="flex absolute w-full left-0 bottom-0  px-6">
        <span className="w-full h-[1px] bg-stone-300"></span>
      </span>
    </div>
  );
};

export default Task;
