// this component is tagged in App.tsx
// This component is for displaying the todo list from todos arrey

import React from 'react';
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const TodoList: React.FC<Props > = ({todos, setTodos}) => {
  return (
    <div className='todos'>
        {todos.map(todo => (
          // SingleTodo component displays each todo and manages edit, delete and complete functionality
            <SingleTodo todo={todo} key={todo.id}
            />
           
        ))}
      
    </div>
  )
}

export default TodoList

