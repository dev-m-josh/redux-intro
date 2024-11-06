import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available, else use an empty array
const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

const initialState = {
    todos: loadTodosFromLocalStorage()
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state = initialState, action) =>{
            const newTodo= {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
            saveTodosToLocalStorage(state.todos); // Save to localStorage
        },
        deleteTodo: (state, action) =>{
            const newTodos = state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.todos = newTodos;
            saveTodosToLocalStorage(newTodos)
        },
        toggleTodo: (state, action) =>{
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
            saveTodosToLocalStorage(state.todos)
        }
    }
});

// Save the todos state to localStorage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  //export actions
export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;