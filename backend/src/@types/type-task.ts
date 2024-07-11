// Enum para representar o status das tarefas
export enum Status {
  pendente = "pendente",
  finalizada = "finalizada",
}

// Tipagem das tarefas
export type Task = {
  id: number;
  title: string;
  status: Status;
};
