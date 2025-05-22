import { FormValidation, HomePage, TodoApp } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";

interface Projects {
  title: string;
  desc: string;
  url: string;
}

export default function App() {
  const navigate = useNavigate();
  const handleClick = (url: string) => {
    navigate(url);
  };

  const projects: Projects[] = [
    {
      title: "Todo App",
      desc: "This app allows you to create an basic todo list",
      url: "/todoApp",
    },
    {
      title: "Form Validation",
      desc: "This app is used for the form validation and track the progress of the form",
      url: "/formValidation",
    },
  ];

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<HomePage handleClick={handleClick} projects={projects} />}
        />
        <Route
          path="/todoApp"
          element={<TodoApp handleClick={handleClick} />}
        />
        <Route
          path="/formValidation"
          element={<FormValidation handleClick={handleClick} />}
        />
      </Routes>
    </>
  );
}
