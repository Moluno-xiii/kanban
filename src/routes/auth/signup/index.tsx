import { createFileRoute, Link } from "@tanstack/react-router";
import { FaGoogle } from "react-icons/fa6";

export const Route = createFileRoute("/auth/signup/")({
  component: RouteComponent,
});

function RouteComponent() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
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
            type="repeatPassword"
            id="repeatPassword"
            name="repeatPassword"
            required
            minLength={8}
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-x-3">
          <span>Continue with Google</span>
          <button className="border-primary hover:bg-primary rounded-md border p-2">
            <FaGoogle size={16} />
          </button>
        </div>

        <div className="text-center">
          <span>Already have an account?</span>
          <Link
            to="/auth/login"
            className="text-primary mx-2 underline hover:no-underline"
          >
            Login
          </Link>
        </div>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
