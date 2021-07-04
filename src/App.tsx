import React,{useState} from "react"
import "./App.css";

/* 
To Fix: 
1. How to center the entire application 
*/

//Represents a single todo item
interface Todo
{
  description: string,
  key: number,
}

//Props for the TodoItem function 
interface TodoProps 
{
    todo: Todo , 
    onDelete(): void,
}

//TodoItem functional component 
function TodoItem(props: TodoProps)
{
    const {todo, onDelete} = props
    return ( 
    <li> 
        Task: {todo.description}
        <button onClick ={onDelete}> Delete </button>
    </li>
    )
}



function App() 
{
  const [todos, updateTodos] = useState([{ description: " ", key: 0 , }])
  const [textInInput, updateText] = useState("")

  return (
     <div>
       <h1> Todos </h1>
       
       <div>
        <input type = "text" value = {textInInput} onChange = {(e) => {updateText(e.target.value)}}/> 
        <button onClick = {() => {    updateTodos(todos.concat(([{ description: textInInput, key: todos.length}]))) }}> Submit </button>
       </div>
       
       {todos.map( todo => (
          <TodoItem todo = {todo}  key = {todo.key} onDelete = {() => updateTodos(todos.filter((curTodo) => curTodo.key !== todo.key))}/>
       ))}
     </div>
   )
}


export default App;