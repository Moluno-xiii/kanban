import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
import { loginUser, signInWithGoogle } from "../../../utils/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast(error.message);
        throw new Error(error.message);
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

      const data = await loginUser(userEmail, password);
      if (!data.user || !data.session) {
        throw new Error("Login failed: no user or session returned");
      }

      dispatch(setUser({ user: data.user, session: data.session }));
      toast.success("Login successful!");
      navigate({ to: "/dashboard/overview", replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center p-3">
      <form
        action=""
        onSubmit={handleSubmit}
        aria-label="login form"
        className="border-secondary flex flex-col gap-y-4 rounded-md border-2 p-3"
      >
        <div className="flex flex-col gap-y-2">
          <label aria-label="email input box title" htmlFor="email">
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
        <div className="relative flex flex-col gap-y-2">
          <label aria-label="password input box title" htmlFor="password">
            Password
          </label>
          <input
            disabled={isLoading}
            aria-label="password input box"
            type={!showPassword ? "password" : "text"}
            id="password"
            name="password"
            required
            minLength={8}
          />
          <div className="text-secondary hover:text-secondary/70 absolute top-11 right-2 cursor-pointer transition-all duration-200">
            {!showPassword ? (
              <FaEye onClick={() => setShowPassword((password) => !password)} />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword((password) => !password)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-3">
          <span>Continue with Google</span>
          <span
            onClick={handleGoogleLogin}
            className="border-primary hover:bg-primary cursor-pointer rounded-md border p-2"
            aria-label="login with google"
          >
            <FaGoogle aria-label="google icon" size={16} />
          </span>
        </div>

        <div className="text-center">
          <span>Don't have an account?</span>
          <Link
            aria-label="link to signup page"
            to="/auth/signup"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Signup
          </Link>
        </div>
        <div className="text-center">
          <span>Forgot your password? Don't fret</span>
          <Link
            aria-label="link to forgot password page"
            to="/auth/forgot-password"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Forgot my password
          </Link>
        </div>
        <button
          disabled={isLoading}
          aria-label="login button"
          className="btn"
          type="submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
