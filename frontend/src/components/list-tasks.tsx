import { Status, Task } from "@/@types/type-task";
import { Checkbox } from "./ui/checkbox";
import DialogUpdate from "./dialog-update";
import DialogDelete from "./dialog-delete";

type ListTasksProps = {
  tasks: Task[];
  updateTask: (task: Task, status?: Status) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const ListTasks = ({ tasks, updateTask, deleteTask }: ListTasksProps) => {
  return (
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
  );
};

export default ListTasks;
