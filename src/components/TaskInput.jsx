import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodos } from "../feature/todosSlice";
import { toast } from "sonner";

const TaskInput = () => {
  const [inputData, setInputData] = useState({ titleInput: "", todoInput: "" });
  const [isHighlighted, setIsHighlighted] = useState(false);

  const todoEditing = useSelector((state) => state.todos.todoEditing);
  const targetRef = useRef(null);

  const dispatch = useDispatch();

  //    for updating todo
  useEffect(() => {
    if (todoEditing !== null) {
      toast.success("You are now editing your todo");

      let todo = todoEditing;
      setInputData({
        todoInput: todo.todoDescription,
        titleInput: todo.todoTitle,
      });

      if (targetRef.current) {
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsHighlighted(true);
    }
  }, [todoEditing]);



  //   Add todo
  function addTodo() {
    if (inputData.titleInput && inputData.todoInput) {
      const newTodo = {
        id: uuidv4(),
        todoTitle: inputData.titleInput,
        todoDescription: inputData.todoInput,
        completed: false,
      };
      dispatch(addTodos(newTodo));
      setInputData({ titleInput: "", todoInput: "" });
      isHighlighted && setIsHighlighted(false);
      toast.success("Your Todo is Saved SuccessFully");
    } else {
      toast.warning("Please write something in title and todos ");
    }
  }

  

  //   for handling inputs
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  return (
    <form
      ref={targetRef}
      className="todo-form"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="todo-input-container ">
        <label htmlFor="title-input">Title :</label>
        <input
          name="titleInput"
          id="title-input"
          placeholder="Whats the title of your todo ? "
          className={
            isHighlighted ? "highlighted-input Todo-input" : "Todo-input"
          }
          type="text"
          value={inputData.titleInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="todo-input-container ">
        <label htmlFor="todo-input">Todos :</label>
        <input
          name="todoInput"
          id="todo-input"
          placeholder="Whats the description of your todo ?"
          className={
            isHighlighted ? "highlighted-input Todo-input" : "Todo-input"
          }
          type="text"
          value={inputData.todoInput}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={addTodo}>Add</button>
    </form>
  );
};

export default TaskInput;
