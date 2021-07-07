import React, { useState,useEffect } from "react";
import "./App.css";
import {Todo, TodoProps} from './t'

function upHandler(
  todo: Todo,
  todos: { description: string; key: number; timeStarted: number }[],
  updateTodos: {
    (
      value: React.SetStateAction<
        { description: string; key: number; timeStarted: number }[]
      >
    ): void;
    (arg0: (array: Todo[]) => Todo[]): void;
  }
) {
  let index = 0;

  for (const element of todos) {
    if (element.key === todo.key) {
      break;
    }

    index++;
  }

  if (index !== 0) {
    updateTodos((array: Array<Todo>) => {
      let data = [...array];
      let temp = data[index];
      data[index] = data[index - 1];
      data[index - 1] = temp;
      return data;
    });
  }
}

function downHandler(
  todo: Todo,
  todos: { description: string; key: number; timeStarted: number }[],
  updateTodos: {
    (
      value: React.SetStateAction<
        { description: string; key: number; timeStarted: number }[]
      >
    ): void;
    (arg0: (array: Todo[]) => Todo[]): void;
  }
) {
  let index = 0;

  for (const element of todos) {
    if (element.key === todo.key) {
      break;
    }

    index++;
  }

  if (index !== todos.length - 1) {
    updateTodos((array: Array<Todo>) => {
      let data = [...array];
      let temp = data[index];
      data[index] = data[index + 1];
      data[index + 1] = temp;
      return data;
    });
  }
}

//TodoItem functional component
function TodoItem(props: TodoProps) {
  const { todo, onDelete, onUp, onDown } = props;

  return (
    <tr>
      <td className="task-desc text-gray-700 text-base">
        {" "}
        {todo.description}{" "}
      </td>
      <td className="task-time text-gray-700 text-base">
        {" "}
        {todo.timeStarted}{" "}
      </td>
      <td className="text-gray-700 text-base">
        {" "}
        <button
          onClick={onDelete}
          className="outline-none mr-1 mb-1 px-3 py-1 bg-transprent text-xs font-bold text-blue-500 uppercase focus:outline-none"
        >
          {" "}
          Delete{" "}
        </button>{" "}
      </td>
      <td className="text-gray-700 text-base">
        {" "}
        <button
          onClick={onUp}
          className="outline-none mr-1 mb-1 px-3 py-1 bg-transprent text-xs font-bold text-blue-500 uppercase focus:outline-none"
        >
          {" "}
          Up{" "}
        </button>{" "}
      </td>
      <td className="text-gray-700 text-base">
        {" "}
        <button
          onClick={onDown}
          className="outline-none mr-1 mb-1 px-3 py-1 bg-transprent text-xs font-bold text-blue-500 uppercase focus:outline-none"
        >
          {" "}
          Down{" "}
        </button>{" "}
      </td>
    </tr>
  );
}

function App() {
  const [todos, updateTodos] = useState([
    { description: " ", key: 0, timeStarted: 0 },
  ]);
  const [textInInput, updateText] = useState("");
  const [time, updateTime] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      updateTime((time) => time + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID)
    }
  }, [time]);

  /* React.useEffect(() => {            //buggy code
    setInterval(() => {
      updateTime(time + 1);
    }, 1000);
    
  }); */
  function handleTodos()
  {
      updateTodos(
        todos.concat([
          {
            description: textInInput,
            key: todos.length,
            timeStarted: time,
          },
        ])
      );
  }

  return (
    <div className="app">
      <header className="title-header">
        <h1> Todos </h1>
      </header>

      <div className="todo-creator">
        <span className="text-xl"> Seconds: {time} </span>
        <div className="form">
          <input
            className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={textInInput}
            onChange={(e) => {
              updateText(e.target.value);
            }}
          />

          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-blue-600 transition duration-200 each-in-out"
            onClick={handleTodos}
          >
            {" "}
            Add Todo{" "}
          </button>
        </div>
      </div>
      <table className="table-fixed bg-white shadow-md rounded-lg p-50">
        <thead>
          <tr>
            <th className="text-gray-700 text-base w-1/4"> Task </th>
            <th className="text-gray-700 text-base w-1/4"> Time Started </th>
            <th className="w-1/8"> </th>
            <th className="w-1/8"> </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.key}
              onDelete={() =>
                updateTodos(todos.filter((curTodo) => curTodo.key !== todo.key))
              }
              onUp={() => upHandler(todo, todos, updateTodos)}
              onDown={() => downHandler(todo, todos, updateTodos)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
