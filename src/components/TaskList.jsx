import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleCompleted, removeTodo, updateTodo } from "../feature/todosSlice";
import { useState } from "react";
import { toast } from "sonner";

function TaskList() {
    const todoEditing = useSelector((state) => state.todos.todoEditing);
    const todos = useSelector((state) => state.todos.todos);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all");

    function editTodo(id) {
        if (todoEditing) {
            toast.warning("Please first save the inputs data !");
            return;
        }
        dispatch(updateTodo(id));
    }

    function completeTodo(id) {
        if (todoEditing) {
            toast.warning("Please first save the inputs data !");
            return;
        }
        dispatch(handleCompleted(id));
    }

    function handleFilterChange(event) {
        setFilter(event.target.value);
    }

    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") {
            return true; // Show all todos
        } else if (filter === "Completed") {
            return todo.completed; // Show only completed todos (assuming a 'completed' property)
        } else {
            return !todo.completed; // Show only uncompleted todos
        }
    });

    return (
      <>
        <label htmlFor="todotypes">Choose Todos by Status:</label>
        <select id="todotypes" onChange={handleFilterChange}>
          <option value="all">All ({todos.length})</option>
          <option value="Completed">
            Completed ({todos.filter((todo) => todo.completed).length})
          </option>
          <option value="Uncompleted">
            Uncompleted ({todos.filter((todo) => !todo.completed).length})
          </option>
        </select>

        <ul className="todos-list-container">
          {filteredTodos.length === 0 && (
            <h2>There are 0 Todos here</h2>
          ) 
          }
          {filteredTodos.map((item) => {
            return (
              <li key={item.id} className="todo-container">
                <h3>
                  <span
                    className={
                      item.completed
                        ? "todo-status todo-status-completed"
                        : "todo-status"
                    }
                  ></span>
                  {item.todoTitle}

                  <button
                    className="react-icon"
                    onClick={() => editTodo(item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="react-icon"
                    onClick={() => completeTodo(item.id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="react-icon"
                    onClick={() => {
                      if (todoEditing) {
                        toast.warning("Please first save the inputs data !");
                        return;
                      }
                      dispatch(removeTodo({ id: item.id }));
                    }}
                  >
                    <FaTrash />
                  </button>
                </h3>
                <p>{item.todoDescription}</p>
              </li>
            );
          })}
        </ul>
      </>
    );
}

export default TaskList;
