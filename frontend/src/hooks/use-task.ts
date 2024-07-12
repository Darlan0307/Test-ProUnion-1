import { Status, Task } from "@/@types/type-task";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [fetch, setFetch] = useState(false);

  const addTask = async (input: string) => {
    try {
      if (!input) return;
      await api.post("/tasks", { title: input });
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, addTask, updateTask, deleteTask };
}
