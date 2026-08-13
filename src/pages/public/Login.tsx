import loginImage from "../../assets/lognImg.svg";
import Button from "../../components/Button";
import { UserIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import type { LoginFormData } from "../../features/todo/types/todo.types";
import { singIn } from "../../services/Auth";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import FormControl from "../../components/FormControl";
import { rememberMe } from "../../lib/supabase";

export default function Login() {
  const [remind, setRemind] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);
    let data: LoginFormData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    setLoading(true);
    let resp = await singIn(data);
    if (resp instanceof AuthError) {
      toast.error(resp.message);
    }
    setLoading(false);
  }
  const toggleMode = () => {
    let newMode = !remind;
    setRemind((prev) => !prev);
    rememberMe(newMode);
  };
  return (
    <div className="grid min-h-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
      <section className="flex min-h-0 items-center justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h1 className="mb-5 text-2xl font-semibold text-heading">Login</h1>
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
                id="username"
                className="bg-neutral-secondary-medium border border-default-medium rounded-md text-heading text-sm focus:ring-brand focus:border-brand block w-full pl-10 pr-3 py-2.5 shadow placeholder:text-body"
                placeholder="Enter Email"
                autoComplete="username"
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
                id="password"
                className="bg-neutral-secondary-medium border border-default-medium rounded-md text-heading text-sm focus:ring-brand focus:border-brand block w-full pl-10 pr-3 py-2.5 shadow placeholder:text-body"
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <FormControl
            id="remember"
            labelText={""}
            className="flex items-center gap-1"
          >
            <input
              type="checkbox"
              defaultChecked={remind}
              onClick={() => toggleMode()}
            />
            <span className="text-sm">Remember Me</span>
          </FormControl>

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
