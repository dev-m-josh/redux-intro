// App.js

import React from 'react';
import TodoList from './TodoList'; 
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Redux Todo-List</h1>
      <TodoList /> 
    </div>
  );
};

export default App;
