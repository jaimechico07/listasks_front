import { useForm } from "react-hook-form";
import { useTasks } from "./../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react"

//fecha
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"));
        setValue("category", task.category);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {

    const datavalid = {
      ...data,
      category: data.category || "other",
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

    if (params.id) {
      updateTask(params.id, datavalid )
    } else {
      createTask(datavalid);
      console.log(datavalid);
    }

    navigate("/tasks");
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-5 sm:p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>

          <div className="flex flex-col ">
          <label htmlFor="category">Category</label>
          <select className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("category")}>
             <option value="">-- Please choose an option --</option>
             <option value="work">Work</option>
             <option value="family">Family</option>
             <option value="entertaiment">entertaiment</option>
             <option value="study">Study</option>
             <option value="other">Other</option>
            </select>
            </div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
