import { useEffect } from "react";
import Task from "./Task";
import { updateTask, useTask } from "../context/TaskContext";

const ListContainer = () => {
  const { taskList, taskListComplete, taskListIncomplte } = useTask();
  const { getAllTask, getCompltedTask, getIncompleteTask } = updateTask();

  useEffect(() => {
    getAllTask();
    getCompltedTask();
    getIncompleteTask();
  }, []);

  useEffect(() => {}, [taskList, taskListComplete, taskListIncomplte]);

  return (
    <div className="flex flex-col h-full w-full pb-2">
      <div className="flex gap-2 items-center py-2 text-stone-600 tracking-wider px-6">
        TASKS
        <span className="text-xs flex justify-center items-center h-5 w-5 bg-stone-400 text-white rounded-full">
          <span className="">{taskList && taskList.length}</span>
        </span>
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-auto pb-30">
        {!taskList && (
          <div className="py-10 text-center tracking-wider font-light">
            Loading...
          </div>
        )}
        {taskList && taskList.length == 0 && (
          <div className="py-10 text-center tracking-wider font-light">
            No Available Task
          </div>
        )}

        {taskListIncomplte &&
          taskListIncomplte.map((item, index) => (
            <Task key={index + item.id} {...item} />
          ))}
        {taskListComplete &&
          taskListComplete.map((item, index) => (
            <Task key={index + item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default ListContainer;
