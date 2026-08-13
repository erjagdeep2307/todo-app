import TaskCard from "../../components/TaskCard";
import cardImage from "../../assets/cardimg.png";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useDeleteTask, useTasks } from "../../hooks/Tasks";
import { useState, useEffect } from "react";
import type { Task } from "../../features/todo/types/todo.types";
import { getImageUrl } from "../../utils/utils";
import { toast } from "sonner";
export default function Tasks() {
  const [curTask, setCurTask] = useState<Task | null>(null);
  const { data, isLoading } = useTasks();
  const {mutate:deleteTask,isPending:isDeleting} = useDeleteTask();

  // 1. Auto-select first task when data loads
  useEffect(() => {
    if (data && data.length > 0 && !curTask) {      
      setCurTask(data[0]);
    }
  }, [data, curTask]);

  // 2. Properly typed click handler that updates curTask
  const handleCardSelection = (
    e: React.MouseEvent<HTMLDivElement>,
    task: Task
  ) => {
    e.preventDefault();
    setCurTask(task);
  };

  const handleDeleteTask = () => {
    if (!curTask) return;
    deleteTask(curTask.id,{
      onSuccess: () => {
          setCurTask(null); // Clear selected task detail view
          toast.success(`Task Deleted`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
    });
  };

  const handleEditTask = () => {
    if (!curTask) return;
    // Trigger edit modal or drawer here
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-4 h-full min-h-0 flex flex-col gap-1">
      <section className="flex-1 flex-wrap min-h-0 overflow-y-auto bg-slate rounded-lg">
        <div className="flex min-h-full flex-col gap-3 lg:flex-row lg:justify-between p-2">
          
          {/* Left Panel: Task List */}
          <div className="flex flex-col text-[11px] bg-white text-gray-400 w-full lg:w-[45%] min-h-full border border-gray-200 rounded-lg p-3 sm:text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <span className="flex">
                  <span className="text-black font-semibold">My Tasks</span>
                </span>
              </div>
              <div className="flex flex-col p-2 gap-2 sm:p-4">
                {isLoading ? (
                  <p className="text-gray-400">Loading tasks...</p>
                ) : data && data.length > 0 ? (
                  data.map((item) => (
                    <TaskCard
                      key={item.id}
                      taskData={item}
                      extraClass={`cursor-pointer transition-colors ${
                        curTask?.id === item.id
                          ? "bg-gray-200 border-todo-primary"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={(e) => handleCardSelection(e, item)}
                    />
                  ))
                ) : (
                  <p className="text-gray-400">No tasks found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Task Details */}
          <div className=" hidden sm:flex flex-col text-[11px] bg-white text-gray-400 w-full lg:w-[60%] min-h-full border border-gray-200 rounded-lg p-3 sm:text-xs gap-1">
            {curTask ? (
              <>
                <div className="flex gap-3">
                  <img
                    src={(curTask?.image_url && getImageUrl(curTask?.image_url,96,96)) || cardImage}
                    className="w-24 h-24 object-cover rounded-md border"
                    alt={curTask.title}
                  />
                  <div className="flex flex-col justify-end gap-1">
                    <h2 className="text-sm font-semibold text-black">
                      {curTask.title}
                    </h2>
                    <span>
                      <strong className="text-black">Priority: </strong>
                      {curTask.priority}
                    </span>
                    <span>
                      <strong className="text-black">Status: </strong>
                      {curTask.status}
                    </span>
                    <span>
                      Created at:{" "}
                      {curTask.created_at
                        ? new Date(curTask.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col pt-3 h-full relative gap-1.5 text-black">
                  <p>
                    <strong>Task Title: </strong>
                    <span className="text-gray-600">{curTask.title}</span>
                  </p>
                  <p>
                    <strong>Objective: </strong>
                    <span className="text-gray-600">
                      {curTask.objective || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Task Description: </strong>
                    <span className="text-gray-600">
                      {curTask.description || "N/A"}
                    </span>
                  </p>
                  <p>
                    <strong>Deadline for Submission: </strong>
                    <span className="text-gray-600">
                      {curTask.deadline_at
                        ? new Date(curTask.deadline_at).toLocaleDateString()
                        : "No deadline"}
                    </span>
                  </p>

                  {/* Action Icons */}
                  <div className="absolute flex gap-2 bottom-0 right-0">
                    <TrashIcon
                      className={`w-6 h-6 rounded-sm p-1 bg-todo-primary text-white ${isDeleting?"cursor-progress pointer-events-none":"cursor-pointer"} hover:opacity-90`}
                      onClick={handleDeleteTask}
                    />
                    <PencilSquareIcon
                      className="w-6 h-6 rounded-sm p-1 bg-todo-primary text-white cursor-pointer hover:opacity-90"
                      onClick={handleEditTask}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a task from the list to view details
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}