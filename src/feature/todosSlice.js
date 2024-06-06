import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    todoEditing: null,
  },
  reducers: {
    addTodos: (state, action) => {
      state.todos = [...state.todos, action.payload];

      if (state.todoEditing !== null) {
        toast.warning("Todo Updated Succesfully");
        state.todoEditing = null;
      }
    },

    handleCompleted: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          let completed = !todo.completed;
          completed
            ? toast.success("Todo Status Changed in completed")
            : toast.success("Todo Status Changed in Uncompleted");

          return { ...todo, completed };
        }
        return todo;
      });
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      toast.success("Todo Deleted Succesfully");
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        todo.id === action.payload ? (state.todoEditing = todo) : null;
        return todo.id !== action.payload;
      });
    },
  },
});

export const { addTodos, removeTodo, updateTodo, handleCompleted } =
  todosSlice.actions;

export default todosSlice.reducer;
