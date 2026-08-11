// src/pages/NotFound.tsx
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-todo-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-todo-primary/10 blur-3xl" />

      {/* Main Container Card */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl text-center">
        {/* Top Status Indicator */}
        <div className="relative mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-todo-primary/10 text-todo-primary">
            <span className="text-2xl font-bold font-mono">404</span>
          </div>
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-todo-primary text-[10px] font-bold text-white shadow">
            !
          </span>
        </div>

        {/* Header Title */}
        <h1 className="text-2xl font-bold text-black tracking-tight">
          Task Not Found
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          The page or route you requested could not be located in your
          workspace.
        </p>

        {/* Mock Interactive Todo Item Card */}
        <div className="my-6 w-full rounded-xl border border-gray-200 bg-slate-50 p-4 text-left font-mono text-xs text-gray-600 shadow-inner space-y-2.5">
          <div className="flex items-center gap-2 text-gray-400 line-through">
            <CheckCircleIcon className="h-4 w-4 text-gray-400 shrink-0" />
            <span>Load URL path</span>
          </div>

          <div className="flex items-center gap-2 text-red-500 font-medium">
            <XCircleIcon className="h-4 w-4 text-red-500 shrink-0" />
            <span>Route exists in app</span>
          </div>

          <div className="flex items-center gap-2 text-todo-primary font-semibold pt-1 border-t border-gray-200/60">
            <ArrowRightIcon className="h-4 w-4 text-todo-primary shrink-0" />
            <span>Redirect back to safety</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/admin/tasks"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-todo-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            <HomeIcon className="h-4 w-4" />
            <span>My Tasks</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
