// This component is tagged in TodoList component
// This component displays each todo with edit, delete and complete functionality

import React, { useEffect, useState, useRef } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { colRef, db } from '../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';


type Props = {
    todo: Todo,
}


const SingleTodo = ({todo}: Props) => {

    // To check whether the edit mode is on
    const [edit, setEdit] = useState<boolean>(false);
    
    // For storing the edit input value
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

   // Updating the data at firestore with the edit input value
    const handleEdit = (e:React.FormEvent, id: string) => {
        e.preventDefault();
        const docRef = (doc(colRef, id))
        const data = {
            todo: editTodo
        }
        updateDoc(docRef, data )
        .then(docRef => {console.log("updated")})
        .catch(error => {
            console.log(error);
        })
    // After updating, turn of the edit mode
    // setEdit(false);
};
    
 
   // Updating the data at firestore when a todo is completed
    const handleDone = (id: string) => {
        const docRef = (doc(colRef, id))
        const data = {
            isDone: true
         }
        updateDoc(docRef, data)
        .then(docRef => {console.log("updated")})
        .catch(error => {
            console.log(error);
        })
};
    

   // this function is to delete the selected todo
    const handleDelete = (id: any) => {
        // setTodos(todos.filter((todo) => todo.id !== id));
        deleteDoc(doc(colRef, id))
};


   const inputRef = useRef<HTMLInputElement>(null)

  // To go to the typing mode directly when clicking the edit button
   useEffect(() => {
    inputRef.current?.focus()
   },[edit]);
   


  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
       

       
        {
            // If edit button is pressed, display the input box 
            edit? (
                <input
                    ref={inputRef}
                    value={editTodo} 
                    onChange={(e) => setEditTodo(e.target.value)} 
                    className="todos__single--text" />
            ): 
            //If the completed button is pressed, cut / strike the todo
                todo.isDone ? (
                    <s className='todos__single--text'>{todo.todo}</s>
                ): 
            // Else display the todo normally
                (
                    <span className='todos__single--text'>{todo.todo}</span>
            )
        }
        


        {/* all the icons (edit, delete, complete) are here that will be displayed right side of each todo)  */}
        <div>
            {/* The edit icon */}
            <span 
                className='icon' 
                onClick={() => {
                // will only edit if the edit mode is on and if the todo is not completed 
                if(!edit && !todo.isDone) {
                    setEdit(!edit);
                }
            }}
            >
            <AiFillEdit />
            </span>

            {/* The delete icon */}
            <span className='icon'
            onClick={() =>handleDelete(todo.id)
            }>
                < AiFillDelete />
            </span>

            {/* The completed icon */}
            <span className='icon' onClick={()=>handleDone( todo.id)}>
                < MdDone />
            </span>

        </div>
        

    </form>
  )
}


export default SingleTodo;
