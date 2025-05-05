import { HomePage, TodoApp } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage handleClick={handleClick} />} />
        <Route
          path="/todoApp"
          element={<TodoApp handleClick={handleClick} />}
        />
      </Routes>
    </>
  );
}
