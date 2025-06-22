import React, { useReducer, useState, type ReactNode } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { iconList } from "../constant/index";
import type {
  TaskFormType,
  TaskFormActionType,
  ToggleTaskType,
  IconDataType,
} from "../type";
import { updateTask } from "../context/TaskContext";

const CreateTask = ({ toggleTaskDisplay }: ToggleTaskType) => {
  const { createTask } = updateTask();

  const [selectedIcon, setSelectedIcon] = useState<ReactNode>(iconList[0].icon);

  const handelSelectedIcon = (item: IconDataType) => {
    setSelectedIcon(item.icon);
    dispatch({
      type: "icon" as keyof typeof formState,
      payload: item.name,
    });
  };

  const taskFormReducer = (
    state: TaskFormType,
    action: TaskFormActionType
  ): TaskFormType => {
    if (action.type === "RESET") {
      return action.payload;
    }
    return {
      ...state,
      [action.type]: action.payload,
    };
  };

  const getCurrentDateTime = (): string => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getLocalISOString = (localDateTimeStr: string) => {
    const [date, time] = localDateTimeStr.split("T");
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    const localDate = new Date(year, month - 1, day, hours, minutes);
    return localDate.toISOString(); // returns correct UTC for backend
  };

  const initialFormState = {
    title: "",
    description: "",
    icon: "HiCubeTransparent",
    completion_date_time: getCurrentDateTime(),
  };

  const [formState, dispatch] = useReducer(taskFormReducer, initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: e.target.name as keyof typeof formState,
      payload: e.target.value,
    });
  };

  const createTaskSubmit = () => {
    const formValidate =
      formState.title == "" ||
      formState.description == "" ||
      formState.icon == "" ||
      formState.completion_date_time == "";
    console.log("formState", formState);
    if (!formValidate) {
      createTask({
        ...formState,
        completion_date_time: getLocalISOString(formState.completion_date_time),
      });
      dispatch({ type: "RESET", payload: initialFormState });
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 basis-0 ">
          <IoIosArrowRoundBack
            size={30}
            className="cursor-pointer"
            onClick={toggleTaskDisplay}
          />
        </div>
        <div className="flex-5 basis-0 text-center">Add New Task</div>
        <div className="flex-1 basis-0"></div>
      </div>

      <div className="felx flex-col  my-10 icon-scroll-box">
        <div className="flex justify-center pb-5">
          <div className="flex justify-center items-center h-14 w-14 rounded-full text-4xl border border-stone-200 ">
            {selectedIcon}
          </div>
        </div>
        <div className="flex flex-wrap justify-start  gap-3 overflow-auto">
          {iconList.map((item) => (
            <div
              key={item.name}
              className="text-2xl cursor-pointer"
              onClick={() => handelSelectedIcon(item)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      <div className="bor mt-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          className="border-b w-full py-2 border-b-stone-400 outline-none"
        />
      </div>
      <div className="bor mt-3">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formState.description}
          onChange={handleChange}
          className="border-b w-full py-2 border-b-stone-400 outline-none"
        />
      </div>
      <div className="bor mt-3">
        <input
          type="datetime-local"
          name="completion_date_time"
          value={formState.completion_date_time}
          onChange={handleChange}
          className="border-b w-full py-2 border-b-stone-400 outline-none"
        />
      </div>

      <div className="flex pt-6">
        <div
          className="w-full p-2 text-center border border-stone-400 hover:border-stone-800 cursor-pointer hover:bg-stone-100 transition-all duration-300 ease-in-out"
          onClick={createTaskSubmit}
        >
          Add Task
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
