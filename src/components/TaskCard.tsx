import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import cardImg from "../assets/cardimg.png";
import Card from "./Card";
import {
  STATUS_DATA,
  type TaskPriority,
} from "../features/todo/types/todo.types";
import type { TaskCardProps } from "../features/todo/types/todo.types";
import { getImageUrl } from "../utils/utils";

const priorityClass: Record<TaskPriority, string> = {
  Low: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  High: "bg-orange-50 text-orange-700",
  Extreme: "bg-red-50 text-red-700",
};

export default function TaskCard({
  extraClass = "",
  taskData,
  onClick,
  ...restProps
}: TaskCardProps) {
  const indicator = STATUS_DATA?.[taskData?.status]?.border;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`relative cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-todo-primary ${extraClass}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      {...restProps}
    >
      <span
        className={`absolute left-2 top-2 h-2 w-2 rounded-full border-2 ${indicator}`}
      />

      <button
        type="button"
        className="absolute right-1 top-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-black"
        onClick={handleMenuClick}
        aria-label="Task options"
      >
        <EllipsisHorizontalIcon className="h-4 w-4" />
      </button>

      <div className="flex justify-between gap-2 pt-2">
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="line-clamp-1 text-sm font-bold text-black">
            {taskData?.title}
          </h3>
          <p className="line-clamp-2 text-xs text-gray-500">
            {taskData?.description || "No description provided."}
          </p>
        </div>

        <div className="flex shrink-0 items-start">
          <img
            src={
              (taskData?.image_url &&
                getImageUrl(taskData?.image_url, 48, 48)) ||
              cardImg
            }
            className="h-12 w-12 rounded-md border object-cover"
            alt={taskData?.title || "Task thumbnail"}
          />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2 text-[10px] text-black">
        <span
          className={`rounded px-2 py-0.5 font-semibold ${priorityClass[taskData.priority]}`}
        >
          {taskData?.priority}
        </span>
        <span className={`font-semibold ${STATUS_DATA[taskData.status].border}`}>
          {STATUS_DATA[taskData.status].label}
        </span>
        <span>
          {taskData?.created_at
            ? new Date(taskData.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </span>
      </div>
    </Card>
  );
}
