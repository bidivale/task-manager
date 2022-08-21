//This component is tagged in App.tsx
// This component contains code for the input field - 
//  the typing area for creating a new todo and the Go button and submitting by enter

import React, { useRef } from 'react';
import "./styles.css";

interface Props{
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void
};


const InputField: React.FC<Props> = ({input, setInput, handleAdd}) => {

 // to remove the focus colour after presing enter in the input box
 const inputRef = useRef<HTMLInputElement>(null);


  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e)
        // removing the focus colour from this input field
        inputRef.current?.blur()
        }}>

        {/* The typing area for input */}
        <input 
        ref={inputRef}
        type='input'
        value={input}
        onChange={
            (e)=>setInput(e.target.value)
        }
         placeholder='Enter a task'
         className='input__box'>
        </input>

        {/* The go button */}
        <button className='input__submit' type='submit' >Go</button>
    </form>
  );
};

export default InputField;

