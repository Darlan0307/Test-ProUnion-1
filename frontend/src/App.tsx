import { Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { Status, Task } from "./@types/type-task";
import { api } from "./services/api";
import { Checkbox } from "./components/ui/checkbox";

import DialogUpdate from "./components/dialog-update";
import DialogDelete from "./components/dialog-delete";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [fetch, setFetch] = useState(false);

  const addTask = async () => {
    try {
      if (!input) return;
      await api.post("/tasks", { title: input });
      setInput("");
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task: Task, status?: Status) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        status: status ?? task.status,
      });
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setFetch(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setFetch(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetch) {
      fetchDataTasks();
    }
  }, [fetch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask();
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
                className="flex gap-4 items-center justify-between w-[300px] "
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
                <p className="flex-1 text-ellipsis">{task.title}</p>

                <div>
                  <DialogUpdate task={task} updateTask={updateTask} />

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
