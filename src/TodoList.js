import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './reducers/todoSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <div>
        {todos.map((todo) => (
          <div key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type='checkbox'  onClick={() => handleToggleTodo(todo.id)}/>
            <p>{todo.text}</p>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
