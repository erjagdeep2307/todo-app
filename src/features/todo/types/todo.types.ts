import type { AuthError, Session, User } from "@supabase/supabase-js";
import type { ComponentPropsWithoutRef } from "react";
// Define your types
export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export interface CardInterface extends ComponentPropsWithoutRef<"div"> {}
// interface for Generic Modal
export interface ModalInterface extends ComponentPropsWithoutRef<"div"> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface UserThumb {
  imgsrc: string;
  pending: number | null | undefined;
}

export interface ProgressData {
  value: number;
  size: number;
  color: "text-green-500" | "text-blue-500" | "text-red-500";
  caption: string;
}

export interface TaskCardProps extends ComponentPropsWithoutRef<"div"> {
  extraClass?: string;
  taskData: Task;
}

export interface ImageInfo {
  src: string;
  alttext: string;
}

export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  created_at?: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: string | null;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface FormControls extends ComponentPropsWithoutRef<"div"> {
  labelText: string;
  id: string;
}

// 1. Define Context shape
export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<{ error: AuthError | null }>;
}

export type TaskPriority = "Low" | "Extreme" | "High";

export const STATUS_DATA = {
  Completed: { label: "Completed", border: "border-green-400 text-green-400" },
  InProgress: { label: "In Progress", border: "border-blue-400 text-blue-500" },
  NotStarted: {
    label: "Not Started",
    border: "border-todo-primary text-todo-primary",
  },
} as const;

export type TaskStatus = keyof typeof STATUS_DATA;

export interface CreateTaskFormData {
  title: string;
  objective?: string;
  description?: string;
  additional_notes?: string;
  priority: TaskPriority;
  status: TaskStatus;
  deadline_at?: string;
  taskImage?: string | null;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  objective: string;
  description: string;
  additional_notes: string | null;
  image_url: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  deadline_at: string;
}
