interface ErrorPropTypes {
  errorMessage: string;
}
const Error: React.FC<ErrorPropTypes> = ({ errorMessage }) => {
  return (
    <div className="flex min-h-[calc(100dvh-150px)] min-w-full flex-col items-center justify-center gap-y-4 text-red-600">
      <p aria-label="Error message">
        Something went wrong: {errorMessage ? errorMessage : ""}
      </p>
    </div>
  );
};

export default Error;
