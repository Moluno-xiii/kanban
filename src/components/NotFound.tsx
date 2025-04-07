import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[calc(100dvh-110px)] flex-col items-center justify-center text-center">
      <h1 className="text-error text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-text mt-2">Sorry, this page doesn't exist.</p>
      <button
        aria-label="link to homepage"
        className="bg-secondary text-text mt-4 rounded px-4 py-2"
        onClick={() => navigate({ to: ".", replace: true })}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
