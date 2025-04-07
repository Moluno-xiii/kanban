import { createFileRoute, Link } from "@tanstack/react-router";
import { FaGoogle } from "react-icons/fa6";
import { signInWithGoogle, signUpNewUser } from "../../../utils/auth.ts";
import { useState } from "react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setIsLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dataObject = Object.fromEntries(formData);

      const userEmail = dataObject.email as string;
      const password = dataObject.password as string;

      const { error } = await signUpNewUser(userEmail, password);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("email verification sent, check your inbox");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        aria-label="signup form"
        onSubmit={handleSubmit}
        className="border-secondary flex flex-col gap-y-4 rounded-md border-2 p-3"
      >
        <div className="flex flex-col gap-y-2">
          <label aria-label="email input title" htmlFor="email">
            Email
          </label>
          <input
            disabled={isLoading}
            aria-label="email input box"
            type="email"
            id="email"
            name="email"
            required
            minLength={3}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label aria-label="password input title" htmlFor="password">
            Password
          </label>
          <input
            disabled={isLoading}
            aria-label="password input box"
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label aria-label="password input title" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            disabled={isLoading}
            aria-label="password input box"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            required
            minLength={8}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-3">
          <span>Continue with Google</span>
          <span
            aria-label="signup with google"
            onClick={handleGoogleLogin}
            className="border-primary hover:bg-primary cursor-pointer rounded-md border p-2"
          >
            <FaGoogle aria-label="google icon" size={16} />
          </span>
        </div>

        <div className="text-center">
          <span>Already have an account?</span>
          <Link
            aria-label="link to login page"
            to="/auth/login"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Login
          </Link>
        </div>
        <button
          disabled={isLoading}
          aria-label="submit button"
          className="btn"
          type="submit"
        >
          {isLoading ? "Loading..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
