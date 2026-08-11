import { useState } from "react";
import Modal from "./Modal";
import FormControl from "./FormControl";
import Button from "./Button";
import {
  INPUT_BASE_CLASS,
  STATUS,
  PRIORITY,
  getTodayDateString,
} from "../utils/utils";
import type {
  CreateTaskFormData,
  TaskPriority,
  TaskStatus,
} from "../features/todo/types/todo.types";
import { useCreateTask } from "../hooks/Tasks";
interface TaskModalProp {
  isOpen: boolean;
  onClose: () => void;
}
export default function TaskModel({ isOpen, onClose }: TaskModalProp) {
  const [error, setError] = useState<string | "">("");
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    let payload: CreateTaskFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      priority: formData.get("priority") as TaskPriority,
      status: formData.get("status") as TaskStatus,
      deadline_at: formData.get("deadline") as string,
    };
    createTask(payload, {
      onError: (err) => {
        console.error(err.message);
      },
      onSuccess: () => {
        console.log(`Created Successfully`);
      },
    });
  };
  return (
    <Modal title="Add New Task" isOpen={isOpen} onClose={() => onClose()}>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Error Banner */}
        {error && (
          <div
            role="alert"
            className="mb-4 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 animate-fadeIn"
          >
            <span className="font-medium">{error}</span>
          </div>
        )}

        <FormControl labelText="title" id="title">
          <div className="relative flex items-center gap-2">
            {/* <UserIcon className="absolute left-3 h-5 w-5 text-body" /> */}
            <input
              type="text"
              id="title"
              name="title"
              className={INPUT_BASE_CLASS}
              placeholder="title"
              required
              maxLength={30}
            />
          </div>
        </FormControl>

        <FormControl labelText="objective" id="objective">
          <div className="relative flex items-center gap-2">
            {/* <AtSymbolIcon className="absolute left-3 h-5 w-5 text-body" /> */}
            <textarea
              id="objective"
              name="objective"
              className={INPUT_BASE_CLASS}
              placeholder="objective of Task"
              maxLength={255}
              required
            />
          </div>
        </FormControl>
        <FormControl labelText="description" id="description">
          <div className="relative flex items-center gap-2">
            {/* <AtSymbolIcon className="absolute left-3 h-5 w-5 text-body" /> */}
            <textarea
              id="description"
              name="description"
              className={INPUT_BASE_CLASS}
              placeholder="description of Task"
              maxLength={255}
              required
            />
          </div>
        </FormControl>
        <div className="flex w-full gap-2">
          <FormControl labelText="priority" id="priority" className="flex-1">
            <div className="relative flex items-center gap-2">
              {/* <LockClosedIcon className="absolute left-3 h-5 w-5 text-body" /> */}
              <select name="priority" className={INPUT_BASE_CLASS} required>
                <option>Choose Priority</option>
                {PRIORITY.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </FormControl>
          <FormControl labelText="status" id="status" className="flex-1">
            <div className="relative flex items-center gap-2">
              {/* <LockClosedIcon className="absolute left-3 h-5 w-5 text-body" /> */}
              <select name="status" className={INPUT_BASE_CLASS} required>
                <option>Choose Status</option>
                {STATUS.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </FormControl>
        </div>

        <FormControl labelText="deadline" id="deadline">
          <div className="relative flex items-center gap-2">
            {/* <Lockout className="absolute left-3 h-5 w-5 text-body" /> */}
            <input
              type="date"
              min={getTodayDateString()}
              id="deadline"
              name="deadline"
              className={INPUT_BASE_CLASS}
              required
            />
          </div>
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          disabled={isCreating}
          className={`${
            isCreating
              ? "cursor-progress pointer-events-none opacity-70"
              : "cursor-pointer"
          } mt-2 w-full rounded-md`}
        >
          {isCreating ? "Please Wait" : "Create Task"}
        </Button>
      </form>
    </Modal>
  );
}
