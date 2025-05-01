import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resetPassword } from "../../../utils/auth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth/forgot-password/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      setIsLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dataObject = Object.fromEntries(formData);
      const userEmail = dataObject.email as string;

      await resetPassword(userEmail);
      toast.success("password reset email sent, check your inbox");
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
        action=""
        onSubmit={handleSubmit}
        className="border-secondary flex flex-col gap-y-4 rounded-md border-2 p-3"
        aria-label="forgot password form"
      >
        <div className="flex flex-col gap-y-2">
          <label aria-label="email header" htmlFor="email">
            Email
          </label>
          <input
            disabled={isLoading}
            aria-label="emeil input box"
            placeholder="e.g genghisthepillager@gmail.com"
            type="email"
            id="email"
            name="email"
            required
            minLength={3}
          />
        </div>
        <button
          disabled={isLoading}
          aria-label="submit button"
          className="btn"
          type="submit"
        >
          {isLoading ? "Loading..." : "Send reset instructions"}
        </button>
      </form>
    </div>
  );
}
