import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 grid grid-cols-1 sm:grid-cols-2 items-center gap-3 py-4 px-8 md:py-5 md:px-10">
      <Link to="/">
        <h1 className="flex justify-center sm:justify-start text-2xl font-bold">Task Manager</h1>
      </Link>

      <ul className="flex flex-col md:flex-row justify-center sm:justify-end items-center gap-2 ">
        {isAuthenticated ? (
          <>
           <li className="capitalize">
             Welcome {user.username}
            </li>
            <li className="flex">
              <Link to="/tasks" className="bg-indigo-500 px-2 py-1 md:px-4 md:py-1 rounded-md">Tasks</Link>
            </li>
            <li className="flex">
              <Link to="/add-task" className="bg-indigo-500 px-2 py-1 md:px-4 md:py-1  rounded-md">Add Task</Link>
            </li>
            <li>
              <Link to="/" onClick={() => {logout()}}>Logout</Link>
            </li>
            </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-md">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-md">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
