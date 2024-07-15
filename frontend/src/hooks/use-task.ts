import { useEffect, useState } from "react";
import { Status, Task } from "../@types/type-task";
import { api } from "../services/api";
import { errorMessage } from "../utils/error-message";
import { sucessMessage } from "../utils/sucess.message";

export function useTask() {
  // estado das tarefas, busca no localstorage se existir, caso não exista, retorna []
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  // estado para verificar se a lista de tarefas foi atualizada
  const [fetch, setFetch] = useState(false);

  // função para adicionar uma tarefa
  const addTask = async (input: string) => {
    try {
      if (!input) return;
      await api.post("/tasks", { title: input });
      setFetch(true);
      // enviando mensagem de sucesso
      sucessMessage("Tarefa adicionada com sucesso!");
    } catch (error) {
      // enviando mensagem de erro
      errorMessage(error);
    }
  };

  // função para atualizar uma tarefa
  const updateTask = async (task: Task, status?: Status) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        status: status ?? task.status,
      });
      setFetch(true);
    } catch (error) {
      errorMessage(error);
    }
  };

  // função para excluir uma tarefa
  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setFetch(true);
      sucessMessage("Tarefa excluída com sucesso!");
    } catch (error) {
      errorMessage(error);
    }
  };

  // função para buscar as tarefas no backend
  const fetchDataTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
      setFetch(false);
    } catch (error) {
      errorMessage(error);
    }
  };

  // useEffect para buscar as tarefas no backend
  useEffect(() => {
    if (fetch) {
      fetchDataTasks();
    }
  }, [fetch]);

  // useEffect para salvar as tarefas no localstorage quando a lista for atualizada
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, addTask, updateTask, deleteTask };
}
