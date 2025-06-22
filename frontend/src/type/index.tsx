import type { ReactNode } from "react";
import { themeColorStyle } from "../constant";

export type ThemeMode = keyof typeof themeColorStyle;
export type ThemeColor = typeof themeColorStyle.light;

export type ThemeValueContextType = {
  properties: ThemeColor;
};

export type ThemeUpdateContextType = {
  toggleTheme: () => void;
};

export type TaskType = {
  id: number;
  position: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  completion_date_time: string;
};

export type ToggleTaskType = {
  toggleTaskDisplay: () => void;
};

export type TaskFormType = {
  title: string;
  description: string;
  icon: string;
  completion_date_time: string;
};

export type TaskFormActionType =
  | {
      type: keyof TaskFormType;
      payload: string;
    }
  | {
      type: "RESET";
      payload: TaskFormType;
    };

export type IconDataType = {
  name: string;
  icon: ReactNode;
};

export type TaskValueContext = {
  task: TaskType;
  taskList: TaskType[];
  taskListComplete: TaskType[];
  taskListIncomplte: TaskType[];
  taskListByDate: TaskType[];
  taskListByDateReverse: TaskType[];
};

export type TaskValueUpdateContext = {
  createTask: (task: TaskFormType) => void;
  getAllTask: () => TaskType[];
  getCompltedTask: () => TaskType[];
  getIncompleteTask: () => TaskType[];
  getTaskByDate: () => TaskType[];
  getTaskByDateReverse: () => TaskType[];
  taskChangePosition: (taskId: number, newPositon: number) => void;
  taskSetComplete: (taskId: number) => void;
  taskSetIncomplete: (taskId: number) => void;
  taskDelete: (taskId: number) => void;
};
