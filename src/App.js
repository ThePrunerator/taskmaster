import "./App.css";
import React, { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageHome from "./views/PageHome";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import CreateTask from "./views/CreateTask";
import RoutineUpdate from "./views/RoutineUpdate";
import CreateRoutine from "./views/CreateRoutine";
import TaskUpdate from "./views/TaskUpdate";

const router = createBrowserRouter([
  { path: "/", element: <PageHome/> },
  { path: "/login", element: <LoginPage/> },
  { path: "/signup", element: <SignUpPage/> },
  { path: "/createtask", element: <CreateTask/> },
  { path: "/task/:id", element: <TaskUpdate/> },
  { path: "/routine/:id", element: <RoutineUpdate/> },
  { path: "/createroutine", element: <CreateRoutine/> }
]);

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
