import { FormEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type FormTaskProps = {
  handleSubmit: (e: FormEvent) => void;
  setInput: (input: string) => void;
  input: string;
};

const FormTask = ({ handleSubmit, setInput, input }: FormTaskProps) => {
  return (
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
  );
};

export default FormTask;
