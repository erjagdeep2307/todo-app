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
  TaskPriority,
  TaskStatus,
} from "../features/todo/types/todo.types";
import { STATUS_DATA } from "../features/todo/types/todo.types";
import { useCreateTask } from "../hooks/Tasks";
import { uploadCloudinary } from "../lib/cloudinary";
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function TaskModal({ isOpen, onClose }: TaskModalProps) {
  // const [error, setError] = useState<string | "">("");
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;
    let formData = new FormData(form);
    let resp = await uploadCloudinary(formData.get("taskImage") as File);
    if (!resp.secure_url) {
      toast.warning(`Unable to upload the Image`);
    }
    const imageVer = getCloudinaryVersionFromPath(resp.secure_url);
    let payload: CreateTaskFormData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      objective: formData.get("objective") as string,
      priority: formData.get("priority") as TaskPriority,
      status: formData.get("status") as TaskStatus,
      deadline_at: formData.get("deadline") as string,
      taskImage: `${imageVer}/${resp.public_id}`,
    };
    createTask(payload, {
      onError: (err) => {
        toast.error(err.message);
      },
      onSuccess: () => {
        form.reset();
        onClose();
        toast.success(`Task Created`);
      },
    });
  };
  return (
    <Modal title="Add New Task" isOpen={isOpen} onClose={() => onClose()}>
      <form className="w-full" onSubmit={handleSubmit}>
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
            <input
              type="text"
              id="objective"
              name="objective"
              className={INPUT_BASE_CLASS}
              placeholder="objective of Task"
              maxLength={100}
              required
            />
          </div>
        </FormControl>
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
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
                {Object.entries(STATUS_DATA).map(([value, data]) => (
                  <option key={value} value={value}>
                    {data.label}
                  </option>
                ))}
              </select>
            </div>
          </FormControl>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
          <FormControl labelText="deadline" id="deadline" className="flex-1">
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
          <FormControl labelText="taskImage" id="taskImage" className="flex-1">
            <div className="relative flex items-center gap-2">
              {/* <Lockout className="absolute left-3 h-5 w-5 text-body" /> */}
              <input
                type="file"
                id="taskImage"
                name="taskImage"
                accept="image/*"
                className={cn(
                  INPUT_BASE_CLASS,
                  "py-0 px-0 file:py-2.5 file:border-0 file:rounded-sm file:bg-gray-300 file:px-1 file:text-sm file:font-semibold file:text-white hover:file:bg-green-500",
                )}
                required
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
            {/* <AtSymbolIcon className="absolute left-3 h-5 w-5 text-body" /> */}
            <textarea
              id="description"
              name="description"
              className={INPUT_BASE_CLASS}
              placeholder="description of Task"
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
          disabled={isCreating}
          className={`${
            isCreating
              ? "cursor-progress pointer-events-none opacity-70"
              : "cursor-pointer"
          } mt-2 rounded-md`}
        >
          {isCreating ? "Please Wait" : "Create Task"}
        </Button>
      </form>
    </Modal>
  );
}
