

import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        visibleToasts={3}
        duration={2000}
      />
      <div className="container">
        <h3>React Todo App</h3>
        <TaskInput />
        <TaskList />
      </div>
    </>
  );
}

export default App;
