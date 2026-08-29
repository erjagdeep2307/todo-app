import Modal from "./Modal";
import FormControl from "./FormControl";
import Button from "./Button";
import { cn } from "../utils/utils";
import { toast } from "sonner";
import {
  INPUT_BASE_CLASS,
  PRIORITY,
  getTodayDateString,
  getCloudinaryVersionFromPath,
} from "../utils/utils";
import type {
  CreateTaskFormData,
  TaskModalProps,
  TaskPriority,
  TaskStatus,
} from "../features/todo/types/todo.types";
import { STATUS_DATA } from "../features/todo/types/todo.types";
import { useCreateTask, useUpdateTask } from "../hooks/Tasks";
import { uploadCloudinary } from "../lib/cloudinary";
import { useState } from "react";

export default function TaskModal({
  isOpen,
  taskToEdit = null,
  onClose,
}: TaskModalProps) {
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isEditing } = useUpdateTask();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const isEditMode = Boolean(taskToEdit);
  const isPending = isCreating || isEditing || isUploadingImage;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("taskImage") as File | null;
    let taskImage = taskToEdit?.image_url || null;

    if (imageFile && imageFile.size > 0) {
      try {
        setIsUploadingImage(true);
        const resp = await uploadCloudinary(imageFile);
        if (!resp.secure_url) {
          toast.warning(`Unable to upload the image`);
        } else {
          const imageVer = getCloudinaryVersionFromPath(resp.secure_url);
          taskImage = `${imageVer}/${resp.public_id}`;
        }
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to upload image.",
        );
        setIsUploadingImage(false);
        return;
      } finally {
        setIsUploadingImage(false);
      }
    }

    const payload: CreateTaskFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      priority: formData.get("priority") as TaskPriority,
      status: formData.get("status") as TaskStatus,
      deadline_at: formData.get("deadline") as string,
      taskImage,
    };

    const options = {
      onError: (err: Error) => {
        toast.error(err.message);
      },
      onSuccess: () => {
        form.reset();
        onClose();
        toast.success(isEditMode ? `Task updated` : `Task created`);
      },
    };

    if (isEditMode && taskToEdit) {
      updateTask({ id: taskToEdit.id, payload }, options);
      return;
    }

    createTask(payload, options);
  };

  return (
    <Modal
      title={isEditMode ? "Edit Task" : "Add New Task"}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <FormControl labelText="title" id="title">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              id="title"
              name="title"
              className={INPUT_BASE_CLASS}
              placeholder="Task title"
              defaultValue={taskToEdit?.title || ""}
              required
              maxLength={80}
            />
          </div>
        </FormControl>

        <FormControl labelText="objective" id="objective">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              id="objective"
              name="objective"
              className={INPUT_BASE_CLASS}
              placeholder="Objective of task"
              defaultValue={taskToEdit?.objective || ""}
              maxLength={100}
              required
            />
          </div>
        </FormControl>

        <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
          <FormControl labelText="priority" id="priority" className="flex-1">
            <div className="relative flex items-center gap-2">
              <select
                name="priority"
                className={INPUT_BASE_CLASS}
                defaultValue={taskToEdit?.priority || ""}
                required
              >
                <option value="" disabled>
                  Choose Priority
                </option>
                {PRIORITY.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </FormControl>
          <FormControl labelText="status" id="status" className="flex-1">
            <div className="relative flex items-center gap-2">
              <select
                name="status"
                className={INPUT_BASE_CLASS}
                defaultValue={taskToEdit?.status || ""}
                required
              >
                <option value="" disabled>
                  Choose Status
                </option>
                {Object.entries(STATUS_DATA).map(([value, data]) => (
                  <option key={value} value={value}>
                    {data.label}
                  </option>
                ))}
              </select>
            </div>
          </FormControl>
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
          <FormControl labelText="deadline" id="deadline" className="flex-1">
            <div className="relative flex items-center gap-2">
              <input
                type="date"
                min={isEditMode ? undefined : getTodayDateString()}
                id="deadline"
                name="deadline"
                className={INPUT_BASE_CLASS}
                defaultValue={taskToEdit?.deadline_at?.slice(0, 10) || ""}
                required
              />
            </div>
          </FormControl>
          <FormControl labelText="taskImage" id="taskImage" className="flex-1">
            <div className="relative flex items-center gap-2">
              <input
                type="file"
                id="taskImage"
                name="taskImage"
                accept="image/*"
                className={cn(
                  INPUT_BASE_CLASS,
                  "px-0 py-0 file:border-0 file:bg-gray-300 file:px-2 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-green-500",
                )}
                required={!isEditMode}
              />
            </div>
          </FormControl>
        </div>

        <FormControl
          labelText="description"
          id="description"
          className="flex-1"
        >
          <div className="relative flex items-center gap-2">
            <textarea
              id="description"
              name="description"
              className={INPUT_BASE_CLASS}
              placeholder="Description of task"
              defaultValue={taskToEdit?.description || ""}
              maxLength={255}
              rows={3}
              cols={8}
              required
            />
          </div>
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="mt-2 rounded-md"
        >
          {isPending
            ? isUploadingImage
              ? "Uploading Image..."
              : "Please Wait"
            : isEditMode
              ? "Update Task"
              : "Create Task"}
        </Button>
      </form>
    </Modal>
  );
}
