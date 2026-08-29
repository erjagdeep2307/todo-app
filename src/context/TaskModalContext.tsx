import { createContext, useContext, useState, type ReactNode } from "react";
import TaskModal from "../components/TaskModal";
import type { Task } from "../features/todo/types/todo.types";

interface TaskModalContextType {
  isOpen: boolean;
  taskToEdit: Task | null;
  openTaskModal: (task?: Task | null) => void;
  closeTaskModal: () => void;
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openTaskModal = (task: Task | null = null) => {
    setTaskToEdit(task);
    setIsOpen(true);
  };

  const closeTaskModal = () => {
    setIsOpen(false);
    setTaskToEdit(null);
  };

  return (
    <TaskModalContext.Provider
      value={{ isOpen, taskToEdit, openTaskModal, closeTaskModal }}
    >
      {children}
      <TaskModal
        isOpen={isOpen}
        taskToEdit={taskToEdit}
        onClose={closeTaskModal}
      />
    </TaskModalContext.Provider>
  );
};

export const useTaskModal = () => {
  const context = useContext(TaskModalContext);
  if (!context) {
    throw new Error(`Failed to Use the TaskModalContext`);
  }
  return context;
};
