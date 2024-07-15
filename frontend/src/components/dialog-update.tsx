import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Task } from "@/@types/type-task";
import { Input } from "./ui/input";
import { useState } from "react";

type Props = {
  task: Task;
  updateTask: (task: Task) => Promise<void>;
};

const DialogUpdate = ({ task, updateTask }: Props) => {
  const [taskUpdate, setTaskUpdate] = useState(task);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id="btn-update-trigger" size="icon" variant="outline">
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizando uma tarefa</DialogTitle>
          <DialogDescription>Escreva o novo título da tarefa</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Atualizar tarefa..."
          value={taskUpdate.title}
          onChange={(e) => {
            setTaskUpdate({ ...taskUpdate, title: e.target.value });
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button id="btn-update" onClick={() => updateTask(taskUpdate)}>
              Atualizar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdate;
