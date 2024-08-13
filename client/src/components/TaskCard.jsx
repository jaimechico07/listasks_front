import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Link, useLocation } from "react-router-dom";

import { IoEllipsisVerticalOutline } from "react-icons/io5";

//fecha
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskCard = ({ task, isActionVisible, onShowAction }) => {
  const { deleteTask, updateTask } = useTasks();
  const [isDone, setIsDone] = useState(task.done);
  const location = useLocation(); // Hook para obtener la ubicación actual

  const handleDoneChange = () => {
    const updatedDone = !isDone;
    const updatedTask = { ...task, done: updatedDone };
    updateTask(task._id, updatedTask);
    setIsDone(updatedDone);
    deleteTask(task._id);
  };

  return (
    <div className="bg-zinc-800  w-full p-10 rounded-md relative">
      <h1 className="text-lg lg:text-2xl font-bold capitalize">{task.title}</h1>
      <p className="text-slate-300 text-base lg:text-xl normal-case">
        {task.description}
      </p>
      <p className="capitalize text-base lg:text-lg">{task.category}</p>
      <p className="text-xs lg:text-base">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
      {location.pathname === "/tasks" ? (
        <label
          onClick={handleDoneChange}
          className={`cursor-pointer text-sm lg:text-base font-semibold duration-300 hover:scale-100 ${
            isDone ? "text-red-500" : "text-indigo-400 block"
          }`}
        >
          {isDone ? "Done" : "Doing"}
        </label>
      ) : (
        <label
        className={`text-sm lg:text-base font-semibold duration-300 hover:scale-100 ${
          isDone ? "text-red-500" : "text-indigo-400 block"
        }`}
      >
        {isDone ? "Done" : "Doing"}
      </label>
      )}
      <IoEllipsisVerticalOutline
        onClick={onShowAction}
        className="absolute top-2 right-1 cursor-pointer"
      />
      {isActionVisible && (
        <div className="flex flex-wrap justify-end w-[150px] items-center text-center absolute top-3 right-6 bg-white rounded-full">
          {location.pathname === "/tasks" ? ( // Verifica si la ruta actual es /tasks
            <Link
              to={`/tasks/${task._id}`}
              className="bg-indigo-500 flex-1 hover:bg-indigo-400 text-sm w-full text-white rounded-full font-bold py-1 px-2"
            >
              edit
            </Link>
          ) : (
            <button
              onClick={handleDoneChange}
              className={`bg-red-500 flex-1 hover:bg-red-400 text-sm w-full rounded-full text-white font-bold py-1 px-2`}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
