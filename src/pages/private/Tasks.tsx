import { useEffect, useMemo, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import TaskCard from "../../components/TaskCard";
import Button from "../../components/Button";
import cardImage from "../../assets/cardimg.png";
import { useDeleteTask, useTasks } from "../../hooks/Tasks";
import type { Task, TaskStatus } from "../../features/todo/types/todo.types";
import { STATUS_DATA } from "../../features/todo/types/todo.types";
import { getImageUrl } from "../../utils/utils";
import { toast } from "sonner";
import { useTaskModal } from "../../context/TaskModalContext";

type SortMode = "newest" | "deadline" | "priority";

const priorityRank = {
  Extreme: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

export default function Tasks() {
  const [curTask, setCurTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const { data, isLoading } = useTasks();
  const { mutateAsync: deleteTaskAsync, isPending: isDeleting } =
    useDeleteTask();
  const { openTaskModal } = useTaskModal();

  useEffect(() => {
    if (data && data.length > 0 && !curTask) {
      setCurTask(data[0]);
    }
  }, [data, curTask]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...(data || [])]
      .filter((task) => {
        const matchesStatus =
          statusFilter === "All" || task.status === statusFilter;
        const matchesSearch =
          !normalizedSearch ||
          [task.title, task.objective, task.description]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));

        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortMode === "deadline") {
          return (
            new Date(a.deadline_at || 8640000000000000).getTime() -
            new Date(b.deadline_at || 8640000000000000).getTime()
          );
        }
        if (sortMode === "priority") {
          return priorityRank[a.priority] - priorityRank[b.priority];
        }
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
  }, [data, search, sortMode, statusFilter]);

  const totals = useMemo(() => {
    const allTasks = data || [];
    const completed = allTasks.filter(
      (task) => task.status === "Completed",
    ).length;
    const overdue = allTasks.filter(
      (task) =>
        task.status !== "Completed" &&
        task.deadline_at &&
        new Date(task.deadline_at) < new Date(),
    ).length;

    return {
      total: allTasks.length,
      completed,
      overdue,
    };
  }, [data]);

  const handleCardSelection = (
    e: React.MouseEvent<HTMLDivElement>,
    task: Task,
  ) => {
    e.preventDefault();
    setCurTask(task);
  };

  const handleDeleteTask = () => {
    if (!curTask) return;
    const taskIdToDelete = curTask.id;
    toast("Are you sure you want to delete this item?", {
      description: "This action cannot be undone.",
      duration: 10000,
      position: "top-center",
      action: {
        label: "Delete",
        onClick: async () => {
          toast.promise(
            deleteTaskAsync(taskIdToDelete).then(() => {
              setCurTask(null);
            }),
            {
              loading: "Deleting task...",
              success: "Task deleted successfully",
              error: (err) => err?.message || "Failed to delete task",
            },
          );
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  const handleEditTask = () => {
    if (!curTask) return;
    openTaskModal(curTask);
  };

  const taskDetails = curTask ? (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <img
          src={
            (curTask?.image_url && getImageUrl(curTask?.image_url, 128, 128)) ||
            cardImage
          }
          className="h-28 w-full rounded-md border object-cover sm:h-24 sm:w-24"
          alt={curTask.title}
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <h2 className="text-base font-semibold text-black">{curTask.title}</h2>
          <span>
            <strong className="text-black">Priority: </strong>
            {curTask.priority}
          </span>
          <span>
            <strong className="text-black">Status: </strong>
            {STATUS_DATA[curTask.status].label}
          </span>
          <span>
            <strong className="text-black">Deadline: </strong>
            {curTask.deadline_at
              ? new Date(curTask.deadline_at).toLocaleDateString()
              : "No deadline"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-3 text-black">
        <p>
          <strong>Objective: </strong>
          <span className="text-gray-600">{curTask.objective || "N/A"}</span>
        </p>
        <p>
          <strong>Task Description: </strong>
          <span className="text-gray-600">{curTask.description || "N/A"}</span>
        </p>
        <p>
          <strong>Created: </strong>
          <span className="text-gray-600">
            {curTask.created_at
              ? new Date(curTask.created_at).toLocaleDateString()
              : "N/A"}
          </span>
        </p>

        <div className="mt-auto flex justify-end gap-2 pt-4">
          <Button
            aria-label="Delete"
            title="Delete Task"
            variant="danger"
            isLoading={isDeleting}
            className="h-9 w-9 rounded-md p-2"
            onClick={handleDeleteTask}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Edit"
            title="Edit Task"
            isLoading={isDeleting}
            className="h-9 w-9 rounded-md p-2"
            onClick={handleEditTask}
          >
            <PencilSquareIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  ) : (
    <div className="flex h-full items-center justify-center text-gray-400">
      Select a task from the list to view details
    </div>
  );

  return (
    <div className="mx-auto flex h-full min-h-0 max-w-7xl flex-col gap-3 sm:px-4">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-xs text-gray-500">Total tasks</p>
          <p className="text-2xl font-bold text-black">{totals.total}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">
            {totals.completed}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <p className="text-xs text-gray-500">Overdue</p>
          <p className="text-2xl font-bold text-red-600">{totals.overdue}</p>
        </div>
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-slate">
        <div className="flex min-h-full flex-col gap-3 p-2 lg:flex-row lg:justify-between">
          <div className="flex min-h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-3 text-[11px] text-gray-400 sm:text-xs lg:w-[45%]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-black">
                  My Tasks
                </span>
                <Button
                  className="rounded-md px-3 py-2"
                  onClick={() => openTaskModal()}
                >
                  Add Task
                </Button>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-todo-primary sm:col-span-3 lg:col-span-1"
                  placeholder="Search tasks"
                />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as TaskStatus | "All")
                  }
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-todo-primary"
                >
                  <option value="All">All statuses</option>
                  {Object.entries(STATUS_DATA).map(([value, status]) => (
                    <option key={value} value={value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-todo-primary"
                >
                  <option value="newest">Newest first</option>
                  <option value="deadline">Deadline first</option>
                  <option value="priority">Priority first</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 p-0 sm:p-2">
                {isLoading ? (
                  <p className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-400">
                    Loading tasks...
                  </p>
                ) : visibleTasks.length > 0 ? (
                  visibleTasks.map((item) => (
                    <TaskCard
                      key={item.id}
                      taskData={item}
                      extraClass={`transition-colors ${
                        curTask?.id === item.id
                          ? "border-todo-primary bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={(e) => handleCardSelection(e, item)}
                    />
                  ))
                ) : (
                  <p className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-400">
                    No tasks match your current view.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-[320px] w-full flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 text-[11px] text-gray-400 sm:text-xs lg:w-[60%]">
            {taskDetails}
          </div>
        </div>
      </section>
    </div>
  );
}
