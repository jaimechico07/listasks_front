import { createContext, useContext, useState, useCallback } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const clearTasks = useCallback(() => {
    setTasks([]);
  }, []);

  const getTasks = useCallback(async (active) => {
    try {
      const res = await getTasksRequest(active);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createTask = useCallback(async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTask = useCallback(async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateTask = useCallback(async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        clearTasks, 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}