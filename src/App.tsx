import React from 'react';
import './App.css';
import InputField from './components/InputField';
import { useEffect, useState } from 'react';
import { Todo } from "./model";
import TodoList from './components/TodoList';
import { colRef } from './firebase';
import { addDoc, serverTimestamp, orderBy, query, onSnapshot} from 'firebase/firestore';


const App: React.FC = () => {
  // For storing data from input field
  const [input, setInput] = useState<string>("");

  // For storing all the data fetched from firestore (storing to display them on the browser)
  const [todos, setTodos] = useState<Todo[]>([]);

  // To get the firestore data at descending order while fetching - the one created last will display first
  const q = query(colRef, orderBy('createdAt', 'desc'));

  // After submitting the input, add data to firestore
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  if(input)
  addDoc(colRef, {
    todo: input,
    isDone: false,
    createdAt: serverTimestamp()
})
//After that, clear the input field
setInput("")
}

// fetching data(all documents from collection) from firestore and storing them at todos arrey
useEffect(() => {
  onSnapshot(q, (snapshot) => {
    console.log(snapshot);
    
    setTodos(snapshot.docs.map(doc =>
     
      ({
        id: doc.id,
        todo: doc.data().todo,
        isDone: doc.data().isDone
      })
      ))    
  })
 
}, [input])



  
  return (
    <div className="App">

      {/* The app heading */}
      <span className="heading">TODO LIST WITH REACT-TS</span>

      {/* InputField component contains the form - the typing area and the "Go" button*/}
      <InputField input={input} setInput={setInput} handleAdd={handleAdd} />

      
      {/* TodoList component contains the todo list placed below the input form */}
      <TodoList todos={todos} setTodos={setTodos} />
      
    </div>
  );
}

export default App;
