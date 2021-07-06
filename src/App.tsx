import React, { useState } from "react";
import "./App.css";

//Represents a single todo item
interface Todo {
  description: string;
  key: number;
  timeStarted: number;
}

//Props for the TodoItem function
interface TodoProps {
  todo: Todo;
  onDelete(): void;
  onUp(): void;
  onDown(): void;
}

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
      <td className = "task-desc">  {todo.description} </td>
      <td className = "task-time">  {todo.timeStarted} </td>
      <td> <button onClick={onDelete}> Delete </button> </td>
      <td> <button onClick={onUp}> Up </button> </td>
      <td> <button onClick={onDown}> Down </button> </td>
    </tr>
  );
}

function App() {
  const [todos, updateTodos] = useState([
    { description: " ", key: 0, timeStarted: 0 },
  ]);
  const [textInInput, updateText] = useState("");
  const [time, updateTime] = useState(0);

  React.useEffect(() => {
    setInterval(() => {
      updateTime((time) => time + 1);
    }, 1000);
  }, []);

  /* React.useEffect(() => {            //buggy code
    setInterval(() => {
      updateTime(time + 1);
    }, 1000);
    
  }); */

  return (
    <div className="app">
      <header className="title-header">
        <h1> Todos </h1>
      </header>

      <div className="todo-creator">
        <span> Seconds: {time} </span>
        <div className="form">
          <input
            type="text"
            value={textInInput}
            onChange={(e) => {
              updateText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              updateTodos(
                todos.concat([
                  {
                    description: textInInput,
                    key: todos.length,
                    timeStarted: time,
                  },
                ])
              );
            }}
          >
            {" "}
            Add Todo{" "}
          </button>
        </div>
      </div>
      <table className="todos">
        <th> Task </th>
        <th> Time Started </th>
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
      </table>
    </div>
  );
}

export default App;
