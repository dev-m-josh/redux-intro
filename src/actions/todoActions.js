import { ADD_TODO, REMOVE_TODO } from "./actionTypes";

//action creator for adding todos
export function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

//action creator for deleting todos
export function deleteTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: id
  }
}

