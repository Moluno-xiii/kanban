import { useNavigate } from "@tanstack/react-router";
interface ErrorPropTypes {
  errorMessage: string;
}
const Error: React.FC<ErrorPropTypes> = ({ errorMessage }) => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[calc(100dvh-150px)] min-w-dvw flex-col items-center justify-center gap-y-4 text-red-600">
      <p aria-label="Error message">
        Something went wrong: {errorMessage ? errorMessage : ""}
      </p>
      <span onClick={() => navigate({ to: "/auth/login", replace: true })}>
        Reload the page and try again.
      </span>
    </div>
  );
};

export default Error;
