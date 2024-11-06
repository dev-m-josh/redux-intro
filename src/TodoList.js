// TodoList.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './reducers/todoSlice';
import './App.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, status } = useSelector((state) => state.todos); // Get todos from the Redux store

  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos()); //Dispatch the fetchTodos action
  }, [dispatch]);

  // Handle adding a new todo
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo)); // Dispatch addTodo action
      setNewTodo('');
    }
  };

  // Handle toggling todo status
  const handleToggleTodo = (id, currentState) => {
    dispatch(toggleTodo({ id, currentState }));
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-list-container">

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update input value
          placeholder="Enter new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>

      <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && todos.length === 0 && <p>No Todos Available</p>}

        {status === 'succeeded' && (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.todo_id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.todo_status}
                  onChange={() => handleToggleTodo(todo.todo_id, todo.todo_status)}
                />
                <p className={todo.todo_status ? 'completed' : ''}>{todo.todo_title}</p>
                <button onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
