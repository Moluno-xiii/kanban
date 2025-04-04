import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resetPassword } from "../../../utils/auth";

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

      const { data, error } = await resetPassword(userEmail);

      if (error) {
        console.error("password reset error:", error.message);
        alert(error.message);
        throw new Error(error.message);
      }

      console.log(dataObject);
      alert("password reset email sent, check your inbox");
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
          <input
            placeholder="e.g genghisthepillager@gmail.com"
            type="email"
            id="email"
            name="email"
            required
            minLength={3}
          />
        </div>
        <button className="btn" type="submit">
          {isLoading ? "Loading..." : "Send reset instructions"}
        </button>
      </form>
    </div>
  );
}
