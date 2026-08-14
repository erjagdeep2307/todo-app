import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import cardImg from "../assets/cardimg.png";
import Card from "./Card";
import { STATUS_DATA } from "../features/todo/types/todo.types";
import type { TaskCardProps } from "../features/todo/types/todo.types";
import { getImageUrl } from "../utils/utils";
export default function TaskCard({
  extraClass = "",
  taskData,
  onClick,
  ...restProps
}: TaskCardProps) {
  let indicator = STATUS_DATA?.[taskData?.status]?.border;
  // Prevent clicking the ellipsis menu icon from triggering the main card selection
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={`relative cursor-pointer transition-all ${extraClass}`}
      onClick={onClick}
      {...restProps}
    >
      {/* Priority Status Indicator Dot */}
      <span
        className={`w-2 h-2 border-2 rounded-full ${indicator} absolute left-2 top-2`}
      ></span>

      {/* Options Ellipsis Icon */}
      <button
        type="button"
        className="absolute right-1 top-1 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black"
        onClick={handleMenuClick}
      >
        <EllipsisHorizontalIcon className="w-4 h-4" />
      </button>

      {/* Card Body */}
      <div className="flex justify-between gap-2 pt-2">
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-sm font-bold text-black line-clamp-1">
            {taskData?.title}
          </h3>
          <p className="line-clamp-2 text-xs text-gray-500">
            {taskData?.description || "No description provided."}
          </p>
        </div>

        <div className="flex items-start shrink-0">
          <img
            src={
              (taskData?.image_url &&
                getImageUrl(taskData?.image_url, 48, 48)) ||
              cardImg
            }
            className="w-12 h-12 object-cover rounded-md border"
            alt={taskData?.title || "Task thumbnail"}
          />
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center text-black text-[10px] justify-between pt-2 border-t border-gray-100 mt-2">
        <span>
          <strong className="font-semibold">Priority:</strong>{" "}
          {taskData?.priority}
        </span>
        <span>
          <strong className="font-semibold">Status:</strong> {taskData?.status}
        </span>
        <span>
          <strong className="font-semibold">Created At:</strong>
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
