import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/auth/confirm-email/")({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    // onsubmit, check if the email confirmation is correct and redirect to homepage or dashboard. and if it doesn't correlate, toast an error message.
  }
  return (
    <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="border-secondary flex flex-col gap-y-4 rounded-md border-2 p-3"
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="otp">Enter the otp sent to your email</label>
          <input type="number" id="otp" name="otp" required minLength={6} />
        </div>
        <button className="btn" type="submit">
          confirm email
        </button>
      </form>
    </div>
  );
}
