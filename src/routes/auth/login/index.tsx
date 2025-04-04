import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { loginUser, signInWithGoogle } from "../../../utils/auth";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      const { data, error } = await signInWithGoogle();
      if (error) {
        alert(error.message);
        console.error("error signing in with google : ", error?.message);
        throw new Error(error.message);
      }
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("error logging in with google : ", error.message);
        alert(error.message);
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

      const { data, error } = await loginUser(userEmail, password);

      if (error) {
        console.error("login error error:", error.message);
        alert(error.message);
        throw new Error(error.message);
      }
      console.log(dataObject);
      alert("Login successful, i think...");
      navigate({ to: "/dashboard/overview", replace: true });
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="border-secondary flex flex-col gap-y-4 rounded-md border-2 p-3"
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required minLength={3} />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-3">
          <span>Continue with Google</span>
          <button
            onClick={handleGoogleLogin}
            className="border-primary hover:bg-primary cursor-pointer rounded-md border p-2"
          >
            <FaGoogle size={16} />
          </button>
        </div>

        <div className="text-center">
          <span>Don't have an account?</span>
          <Link
            to="/auth/signup"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Signup
          </Link>
        </div>
        <div className="text-center">
          <span>Forgot your password? Don't fret</span>
          <Link
            to="/auth/forgot-password"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Reset my password
          </Link>
        </div>
        <button className="btn" type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
