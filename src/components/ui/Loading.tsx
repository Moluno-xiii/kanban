const Loading = ({ message }: { message?: string }) => {
  return (
    <div className="text-secondary flex min-h-[calc(100dvh-150px)] w-full flex-col items-center justify-center gap-y-2 text-center">
      {message ? message + "..." : "Loading Data..."}
      <div
        className="bg-secondary size-6 animate-spin"
        aria-label="loading indicator"
      ></div>
    </div>
  );
};

export default Loading;
