import { FormEvent, useState } from "react";
import { useTask } from "./hooks/use-task";
import FormTask from "./components/form-task";
import ListTasks from "./components/list-tasks";

function App() {
  const [input, setInput] = useState("");

  const { tasks, addTask, updateTask, deleteTask } = useTask();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask(input);
    setInput("");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-2xl font-bold">Lista de Tarefas</h1>
      <FormTask handleSubmit={handleSubmit} setInput={setInput} input={input} />
      <div className="mt-6">
        <h2 className="text-xl text-center mb-6">Suas tarefas</h2>
        {tasks.length == 0 && (
          <p className="text-muted-foreground">Nenhuma tarefa no momento</p>
        )}
        {tasks.length > 0 && (
          <ListTasks
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </main>
  );
}

export default App;
