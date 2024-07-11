import { Request, Response } from "express";
import { Status, Task } from "../@types/type-task";

// Array de objetos da tarefa
const tasks: Task[] = [];

//
export class TaskController {
  // criando uma nova tarefa
  async addTask(req: Request, res: Response) {
    try {
      const { title } = req.body;
      // Verificando se o título é válido
      if (!title) {
        res.status(400).json({ message: "Título inválido" });
        return;
      }
      // Adicionando uma tarefa na lista
      tasks.push({ id: tasks.length + 1, title, status: Status.pendente });
      res.status(201).json({ message: "Tarefa adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar tarefa" });
    }
  }
  // Retornando todas as tarefas
  async getAllTasks(req: Request, res: Response) {
    try {
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao recuperar tarefas" });
    }
  }

  // Atualizando uma tarefa
  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, status } = req.body;

      // Verificando se o id é válido
      const isValidId = tasks.find((task) => task.id === Number(id));
      if (!isValidId) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      // Atualizando a tarefa na lista
      const index = Number(id) - 1;
      tasks[index].title = title;
      tasks[index].status = status;
      res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
  }
  // Deleta uma tarefa
  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Verificando se o id é válido
      const isValidId = tasks.find((task) => task.id === Number(id));
      if (!isValidId) {
        res.status(400).json({ message: "ID inválido" });
        return;
      }
      // Deletando a tarefa na lista
      const index = Number(id) - 1;
      tasks.splice(index, 1);
      res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar tarefa" });
    }
  }
}
