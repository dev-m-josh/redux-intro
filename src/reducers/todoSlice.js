import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// The token to use for authorization
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfbmFtZSI6IkJvYiBTbWl0aCIsInVzZXJfZW1haWwiOiJib2Iuc21pdGhAMjQuY29tIiwidXNlcl9wYXNzd29yZCI6IkJsdWVTa3khODgifSwiaWF0IjoxNzI5NzkyMDU2fQ.sj1jw2-C4vuHHCZldlH6Qh97VBpPHgpsv6Z7TG6W77I';

// Fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    //get request to the server
    const response = await axios.get('http://localhost:3500/todos?page=1&pageSize=10', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    //return todos if successful
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch todos');
  }
});

// Add new todo
export const addTodo = createAsyncThunk('todos/addTodo', async (todoTitle, thunkApi) => {
  const newTodo = { todo_title: todoTitle, todo_status: false };
  
  try {
    //post request to add new todo
    const response = await axios.post('http://localhost:3500/todos', JSON.stringify(newTodo), {
      headers: {
        'Content-Type': 'application/json', // specify content type as JSON
        'Authorization': `Bearer ${token}`,
      },
    });
    thunkApi.dispatch(fetchTodos)
    return response.data; // Return the new todo item
  } catch (error) {
    throw new Error('Failed to add todo');
  }
});

// Toggle todo status
export const toggleTodo = createAsyncThunk('todos/toggleTodo', async ({ id, currentState }) => {
    //toggle current state
  const updatedStatus = !currentState;
  
  try {
    //put request to update todo status
    await axios.put(`http://localhost:3500/todos/${id}`, { todo_status: updatedStatus }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return { id, updatedStatus }; // Return the updated todo id and status
  } catch (error) {
    throw new Error('Failed to update todo status');
  }
});

// Delete todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  try {
    //DELETE request for removing todo from server
    await axios.delete(`http://localhost:3500/todos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return id; // Return the ID of the deleted todo
  } catch (error) {
    throw new Error('Failed to delete todo');
  }
});

// Define the initial state
const initialState = {
  todos: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded'
  error: null,
};

// Create the slice
const todoSlice = createSlice({
  name: 'todos', // slice name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      
      // Handle adding a new todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })

      // Handle toggling the status of a todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const { id, updatedStatus } = action.payload;
        const todo = state.todos.find(todo => todo.todo_id === id);
        if (todo) {
          todo.todo_status = updatedStatus;
        }
      })

      // Handle deleting a todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.todo_id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
