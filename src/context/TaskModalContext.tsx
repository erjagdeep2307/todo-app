import { createContext, useContext, useState, type ReactNode } from "react"
import TaskModal from "../components/TaskModal";
interface TaskModalContextType {
    isOpen: boolean;
    openTaskModal: () => void;
    closeTaskModal: () => void;
}

const TaskModalContext = createContext<TaskModalContextType|undefined>(undefined);
export const ModalProvider = ({children}:{children:ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openTaskModal = () => setIsOpen(true);
    const closeTaskModal = () => setIsOpen(false);
    return (
        <TaskModalContext.Provider value={{isOpen,openTaskModal,closeTaskModal}}>
            {children}
           <TaskModal isOpen={isOpen} onClose={closeTaskModal}/> 
        </TaskModalContext.Provider>
    );
}
export const useTaskModal = () =>{
    const context = useContext(TaskModalContext);
    if(!context){
        throw new  Error(`Failed to Use the TaskModalContext`);
    }
    return context;
}