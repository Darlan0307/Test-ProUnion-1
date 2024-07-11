import { Router } from "express";
import { TaskController } from "./controller/TaskController";
// Criando objeto do router para poder registrar rotas
const router = Router();

// Criando uma instancia da classe TaskController
const taskController = new TaskController();

// Rota padrão
router.get("/", (_, res) => {
  res.send("API de tarefas");
});
// Rota para listar todas as tarefas
router.get("/tasks", taskController.getAllTasks);

// Rota para criar uma nova tarefa
router.post("/tasks", taskController.addTask);

// Rota para atualizar uma tarefa
router.put("/tasks/:id", taskController.updateTask);

// Rota para deletar uma tarefa
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
