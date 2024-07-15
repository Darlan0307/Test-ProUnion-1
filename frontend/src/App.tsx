import TodoApp from "./components/todo-app";
import { Toaster } from "@/components/ui/sonner";
function App() {
  return (
    <>
      {/* Aplicação Todo App */}
      <TodoApp />
      {/* Componente de notificação */}
      <Toaster />
    </>
  );
}

export default App;
