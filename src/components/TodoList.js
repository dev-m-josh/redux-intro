import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {addTodo, deleteTodo } from "../actions/todoActions";

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const todos =useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () =>{
        if (newTodo.trim()) {
            dispatch(addTodo({
                id: Date.now(),
                text: newTodo
            }));
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id) =>{
        dispatch(deleteTodo(id));
    };


  return (
    <div>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      
      <div>
        {todos.map(todo => (
          <div key={todo.id}>
            <input type='checkbox' />
            <p>{todo.text}</p> 
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
