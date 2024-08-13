import { useTasks } from "../context/TaskContext";
import { useEffect, useState, useCallback } from "react";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const { getTasks, tasks, clearTasks } = useTasks();
    const { isAuthenticated } = useAuth();
    const [visibleActionId, setVisibleActionId] = useState(null);
    const [timerId, setTimerId] = useState(null);

    const handleShowAction = useCallback((id) => {
        if (timerId) {
          clearTimeout(timerId);
        }
  
        setVisibleActionId(visibleActionId === id ? null : id);
  
        const newTimerId = setTimeout(() => {
          setVisibleActionId(null);
        }, 3000);
    
        setTimerId(newTimerId);
    }, [visibleActionId, timerId]);

    useEffect(() => {
        if (isAuthenticated) {
            getTasks(false); // Solo obtener tareas si el usuario está autenticado
        } else {
            clearTasks(); // Limpiar tareas si el usuario no está autenticado
        }
    }, [isAuthenticated, getTasks, clearTasks]);
  
    return (
      <div>
        {tasks.length <= 0 ? (
            <h1 className="text-4xl mb-2 text-center">No hay tareas Realizadas</h1>
        ):(
            <h1 className="text-4xl mb-2 text-center">Tareas Realizadas</h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {tasks.map((task) => (
              <TaskCard
                task={task}
                key={task._id}
                isActionVisible={visibleActionId === task._id}
                onShowAction={() => handleShowAction(task._id)}
              />
            ))}
        </div>
      </div>
    );
};

export default HomePage;