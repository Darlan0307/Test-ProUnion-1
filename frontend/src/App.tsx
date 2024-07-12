import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { FormEvent, useState } from "react";
import { Status } from "./@types/type-task";
import { Checkbox } from "./components/ui/checkbox";
import DialogUpdate from "./components/dialog-update";
import DialogDelete from "./components/dialog-delete";
import { useTask } from "./hooks/use-task";

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
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[300px] relative"
      >
        <Input
          placeholder="Adicionar tarefa..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button type="submit" className="" size="icon">
          <Plus />
        </Button>
      </form>
      <div className="mt-6">
        <h2 className="text-xl text-center mb-6">Suas tarefas</h2>
        {tasks.length == 0 && (
          <p className="text-muted-foreground">Nenhuma tarefa no momento</p>
        )}
        {tasks.length > 0 && (
          <ul className="flex flex-col gap-5">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex gap-4 items-center justify-between w-[300px]"
              >
                <Checkbox
                  checked={task.status === Status.finalizada}
                  onClick={() =>
                    updateTask(
                      task,
                      task.status === Status.finalizada
                        ? Status.pendente
                        : Status.finalizada
                    )
                  }
                />
                <p
                  className={`flex-1 text-ellipsis ${
                    task.status === Status.finalizada
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {task.title}
                </p>

                <div>
                  {task.status === Status.pendente && (
                    <DialogUpdate task={task} updateTask={updateTask} />
                  )}

                  <DialogDelete id={task.id} deleteTask={deleteTask} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default App;
