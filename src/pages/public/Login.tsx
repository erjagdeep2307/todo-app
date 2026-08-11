import loginImage from "../../assets/lognImg.svg";
import Button from "../../components/Button";
import { UserIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import type { LoginFormData } from "../../features/todo/types/todo.types";
import { singIn } from "../../services/Auth";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(""); // Clear previous errors before submission
    const form = e.currentTarget;
    let formData = new FormData(form);
    let data: LoginFormData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    let resp = await singIn(data);
    if (resp instanceof AuthError) {
      setError(resp.message);
    }
    setLoading(false);
  }

  return (
    <div className="grid min-h-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
      <section className="flex min-h-0 items-center justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h1 className="mb-5 text-2xl font-semibold text-heading">Login</h1>
          
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 animate-fadeIn"
            >
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="email-alternative"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <div className="flex relative items-center gap-2">
              <UserIcon className="absolute left-3 w-5 h-5 text-body" />
              <input
                type="email"
                name="username"
                id="email-alternative"
                className="bg-neutral-secondary-medium border border-default-medium rounded-md text-heading text-sm focus:ring-brand focus:border-brand block w-full pl-10 pr-3 py-2.5 shadow placeholder:text-body"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password-alternative"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your password
            </label>
            <div className="flex relative items-center gap-2">
              <LockClosedIcon className="absolute left-3 w-5 h-5 text-body" />
              <input
                type="password"
                name="password"
                id="password-alternative"
                className="bg-neutral-secondary-medium border border-default-medium rounded-md text-heading text-sm focus:ring-brand focus:border-brand block w-full pl-10 pr-3 py-2.5 shadow placeholder:text-body"
                placeholder="********"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="mt-2 w-full rounded-md"
          >
            {loading ? "Please Wait" : "Sign In"}
          </Button>

          {/* Professional Signup Link Callout */}
          <p className="mt-5 text-center text-sm text-body">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-brand hover:underline transition-colors"
            >
              Create an account
            </Link>
          </p>
        </form>
      </section>

      <section className="hidden min-h-0 items-end justify-center md:flex">
        <img
          fetchPriority="high"
          src={loginImage}
          alt="Login Page Image"
          className="max-h-[38vh] w-full max-w-sm object-contain md:max-h-[90vh] md:max-w-md"
        />
      </section>
    </div>
  );
}