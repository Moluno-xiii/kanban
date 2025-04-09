import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { updateUser } from "../../../utils/auth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth/reset-password/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setIsLoading(true);
      setFormError("");
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dataObject = Object.fromEntries(formData);

      if (dataObject.password !== dataObject.repeatPassword) {
        setFormError("password fields to not match");
        throw new Error("password fields do not match");
      }

      const userEmail = dataObject.email as string;
      const userPassword = dataObject.password as string;

      const { error } = await updateUser(userEmail, userPassword);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("password updated successfully");
      navigate({ to: "/auth/login", replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center">
      <form
        aria-label="reset password form"
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
            placeholder="e.g GenghisThePillager@gmail.com"
            type="email"
            id="email"
            name="email"
            required
            minLength={3}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label aria-label="new password input box title" htmlFor="password">
            New Password
          </label>
          <input
            disabled={isLoading}
            aria-label="new password input box"
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
            placeholder="Enter new password"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label
            aria-label="repeat password input box title"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <input
            disabled={isLoading}
            aria-label="repeat password input box"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            required
            minLength={8}
            placeholder="Repeat new password"
          />
          {formError ? (
            <span className="text-error text-xs md:text-sm">{formError}</span>
          ) : null}
        </div>
        <button
          disabled={isLoading}
          aria-label="submit button"
          className="btn"
          type="submit"
        >
          {isLoading ? "Loading..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
