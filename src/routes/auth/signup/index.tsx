import { createFileRoute, Link } from "@tanstack/react-router";
import { FaGoogle } from "react-icons/fa6";
import { signInWithGoogle, signUpNewUser } from "../../../utils/auth.ts";
import { useState } from "react";

export const Route = createFileRoute("/auth/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
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

      const { data, error } = await signUpNewUser(userEmail, password);

      if (error) {
        console.error("signup error:", error.message);
        alert(error.message);
        throw new Error(error.message);
      }

      console.log(dataObject);
      alert("email verification sent, check your inbox");
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
        <div className="flex flex-col gap-y-2">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
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
          <span>Already have an account?</span>
          <Link
            to="/auth/login"
            className="text-secondary mx-2 underline hover:no-underline"
          >
            Login
          </Link>
        </div>
        <button className="btn" type="submit">
          {isLoading ? "Loading..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
