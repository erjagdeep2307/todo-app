import { useState } from "react";
import signUpImg from "../../assets/sgnupImg.svg";
import Button from "../../components/Button";
import { signUp } from "../../services/Auth";
import {
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/16/solid";
import { LockClosedIcon as Lockout } from "@heroicons/react/24/outline";
import FormControl from "../../components/FormControl";
import type { SignUpFormData } from "../../features/todo/types/todo.types";
import { Link } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";
export default function SignUp() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: SignUpFormData = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      profileImage: (formData.get("profileImage") as File) || null,
    };

    // Client-side validation before triggering API call
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSending(true);

    try {
      const resp = await signUp(data);
      if (resp instanceof AuthError) {
        setError(resp.message);
      } else {
        setSuccess("Account created successfully! Check your email to confirm registration.");
        form.reset();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Sign up failed:", err);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="grid min-h-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
      <section className="hidden min-h-0 items-end justify-center md:flex">
        <img
          fetchPriority="high"
          src={signUpImg}
          alt="Sign Up Visual"
          className="max-h-[34vh] w-full max-w-sm object-contain md:max-h-[min(34rem,calc(100dvh-10rem))] md:max-w-md"
        />
      </section>

      <section className="flex min-h-0 items-center justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h1 className="mb-3 text-2xl font-semibold text-heading">Sign Up</h1>

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 animate-fadeIn"
            >
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div
              role="status"
              className="mb-4 p-3 text-sm text-green-800 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 animate-fadeIn"
            >
              <span className="font-medium">{success}</span>
            </div>
          )}

          <FormControl labelText="Full Name" id="fullname">
            <div className="relative flex items-center gap-2">
              <UserIcon className="absolute left-3 h-5 w-5 text-body" />
              <input
                type="text"
                id="fullname"
                name="fullName"
                className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 pl-10 pr-3 text-sm shadow placeholder:text-body"
                placeholder="Enter Full Name"
                required
                maxLength={30}
              />
            </div>
          </FormControl>

          <FormControl labelText="Your email" id="email">
            <div className="relative flex items-center gap-2">
              <AtSymbolIcon className="absolute left-3 h-5 w-5 text-body" />
              <input
                type="email"
                id="email"
                name="email"
                className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 pl-10 pr-3 text-sm shadow placeholder:text-body"
                placeholder="Enter email"
                required
              />
            </div>
          </FormControl>

          <FormControl labelText="Your Password" id="password">
            <div className="relative flex items-center gap-2">
              <LockClosedIcon className="absolute left-3 h-5 w-5 text-body" />
              <input
                type="password"
                id="password"
                name="password"
                className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 pl-10 pr-3 text-sm shadow placeholder:text-body"
                placeholder="********"
                required
                minLength={6}
              />
            </div>
          </FormControl>

          <FormControl labelText="Confirm Password" id="cnfrmPass">
            <div className="relative flex items-center gap-2">
              <Lockout className="absolute left-3 h-5 w-5 text-body" />
              <input
                type="password"
                id="cnfrmPass"
                name="confirmPassword"
                className="bg-neutral-secondary-medium border-default-medium text-heading rounded-base focus:ring-brand focus:border-brand block w-full rounded-md border py-2.5 pl-10 pr-3 text-sm shadow placeholder:text-body"
                placeholder="********"
                required
                minLength={6}
              />
            </div>
          </FormControl>

          <FormControl labelText="Upload Profile Image" id="profImg">
            <input
              type="file"
              id="profImg"
              name="profileImage"
              accept="image/*"
              className="bg-neutral-secondary-medium border-default-medium text-heading focus:ring-brand focus:border-brand block w-full cursor-pointer rounded-md border text-sm text-gray-500 file:mr-4 file:border-0 file:bg-gray-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-500"
            />
          </FormControl>

          <Button
            type="submit"
            variant="primary"
            disabled={isSending}
            className={`${
              isSending ? "cursor-progress pointer-events-none opacity-70" : "cursor-pointer"
            } mt-2 w-full rounded-md`}
          >
            {isSending ? "Submitting..." : "Sign Up"}
          </Button>

          {/* Sign In Link Callout */}
          <p className="mt-5 text-center text-sm text-body">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-brand hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}