import { useEffect, useReducer, useState } from "react";

interface State {
  todos: {
    data: string;
    completed: boolean;
    date: string;
    time: string;
  }[];
}

type Action =
  | {
      type: "ADD_TODO";
      payload: {
        data: string;
        completed: boolean;
        date: string;
        time: string;
      };
    }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "SET_TODOS"; payload: State["todos"] };

interface TodoAppProps {
  handleClick: (url: string) => void;
}

function getInitialState(): State {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    try {
      const parsedState = JSON.parse(savedTodos);
      if (parsedState && Array.isArray(parsedState.todos)) {
        console.log("parsed todos ", parsedState.todos);
        return parsedState;
      }
    } catch (error) {
      console.error("Failed to parse saved todos", error);
    }
  }
  return { todos: [] };
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return { todos: [...state.todos, action.payload] };
    case "DELETE_TODO":
      return { todos: state.todos.filter((_, i) => i !== action.payload) };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo, i) =>
          i === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "SET_TODOS":
      return { todos: action.payload };
    default:
      return state;
  }
}

export default function TodoApp({ handleClick }: TodoAppProps) {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const handleAddTask = () => {
    if (input.trim()) {
      const today = new Date().toISOString().split("T")[0];
      const time = new Date().toLocaleTimeString();
      dispatch({
        type: "ADD_TODO",
        payload: {
          data: input,
          completed: false,
          date: today,
          time: time,
        },
      });
      setInput("");
    }
  };

  return (
    <>
      <div className="p-4 min-h-dvh max-w-[1200px] mx-auto">
        <div className="mb-4">
          <button
            className="bg-blue-400 px-5 py-2 rounded-2xl w-fit text-white hover:-translate-y-1 hover:cursor-pointer transition-all"
            onClick={() => handleClick("/")}
          >
            Home
          </button>
        </div>
        <h3 className="font-bold text-xl">Todo App</h3>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-slate-400 text-white px-3 py-2 "
            placeholder="Enter a new task"
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            className="bg-green-400 px-3 py-2 rounded-[8px]"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        <div className="flex flex-col justify-center gap-4 mt-2">
          {state.todos.map((todo, index) => (
            <div className="flex items-center gap-4" key={index}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: index })
                }
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.data} - {todo.date} {todo.time}
              </span>
              <button
                className="bg-red-500 px-3 py-1 rounded-[8px] text-white"
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: index })
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
