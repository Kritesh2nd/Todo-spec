import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import type {
  TaskFormType,
  TaskType,
  TaskValueContext,
  TaskValueUpdateContext,
} from "../type";

import { toast } from "react-toastify";

const TaskContext = createContext<TaskValueContext>({
  task: {
    id: 0,
    position: 0,
    title: "",
    description: "",
    icon: "",
    completed: false,
    completion_date_time: "",
  },
  taskList: [],
  taskListComplete: [],
  taskListIncomplte: [],
  taskListByDate: [],
  taskListByDateReverse: [],
});

const TaskContextUpdate = createContext<TaskValueUpdateContext>({
  createTask: (task: TaskFormType) => {},
  getAllTask: () => [],
  getCompltedTask: () => [],
  getIncompleteTask: () => [],
  getTaskByDate: () => [],
  getTaskByDateReverse: () => [],
  taskChangePosition: (taskId: number, newPositon: number) => {},
  taskSetComplete: (taskId: number) => {},
  taskSetIncomplete: (taskId: number) => {},
  taskDelete: (taskId: number) => {},
});

export const useTask = () => useContext(TaskContext);
export const updateTask = () => useContext(TaskContextUpdate);

const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [task, setTaks] = useState<TaskType>({
    id: 0,
    position: 0,
    title: "",
    description: "",
    icon: "",
    completed: false,
    completion_date_time: "",
  });

  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [taskListComplete, setTaskListComplete] = useState<TaskType[]>([]);
  const [taskListIncomplte, setTaskListIncomplte] = useState<TaskType[]>([]);
  const [taskListByDate, setTaskListByDate] = useState<TaskType[]>([]);
  const [taskListByDateReverse, setTaskListByDateReverse] = useState<
    TaskType[]
  >([]);

  const notify = () => toast.info("Task Created!");

  const createTask = (task: TaskFormType) => {
    const url = `http://localhost:8000/api/task/create`;
    axios
      .post(url, task)
      .then((res) => {
        console.log("reply", res.data);
        notify();
        getAllTask();
        getCompltedTask();
        getIncompleteTask();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getAllTask = () => {
    const url = `http://localhost:8000/api/task/all?format=json`;
    axios
      .get(url)
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return [];
  };
  const getCompltedTask = () => {
    const url = `http://localhost:8000/api/task/completed?format=json`;
    axios
      .get(url)
      .then((res) => {
        setTaskListComplete(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return [];
  };
  const getIncompleteTask = () => {
    const url = `http://localhost:8000/api/task/incomplete?format=json`;
    axios
      .get(url)
      .then((res) => {
        setTaskListIncomplte(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return [];
  };
  const getTaskByDate = () => {
    return [];
  };
  const getTaskByDateReverse = () => {
    return [];
  };
  const taskChangePosition = (taskId: number, newPositon: number) => {};
  const taskSetComplete = (taskId: number) => {
    const url = `http://localhost:8000/api/task/set-complete/${taskId}`;
    console.log("url", url);
    axios
      .patch(url)
      .then((res) => {
        console.log(res.data);
        getAllTask();
        getCompltedTask();
        getIncompleteTask();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const taskSetIncomplete = (taskId: number) => {
    const url = `http://localhost:8000/api/task/set-incomplete/${taskId}`;
    axios
      .patch(url)
      .then((res) => {
        console.log(res.data);
        getAllTask();
        getCompltedTask();
        getIncompleteTask();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const taskDelete = (taskId: number) => {
    const url = `http://localhost:8000/api/task/delete/${taskId}`;
    axios
      .delete(url)
      .then((res) => {
        console.log(res.data);
        getAllTask();
        getCompltedTask();
        getIncompleteTask();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        taskList,
        taskListComplete,
        taskListIncomplte,
        taskListByDate,
        taskListByDateReverse,
      }}
    >
      <TaskContextUpdate
        value={{
          createTask,
          getAllTask,
          getCompltedTask,
          getIncompleteTask,
          getTaskByDate,
          getTaskByDateReverse,
          taskChangePosition,
          taskSetComplete,
          taskSetIncomplete,
          taskDelete,
        }}
      >
        {children}
      </TaskContextUpdate>
    </TaskContext.Provider>
  );
};

export default TaskProvider;
