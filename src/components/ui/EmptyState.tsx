interface EmptyStateProps {
  handleClick?: (state: boolean) => void;
  children?: React.ReactNode;
  button: boolean;
  buttonText?: string;
  emptyStateText: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  handleClick,
  button,
  buttonText,
  emptyStateText,
  children,
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <p className="max-w-lg px-2 text-center text-xl md:text-2xl">
        {emptyStateText}
      </p>
      {button && handleClick ? (
        <button
          aria-label="add project button"
          onClick={() => handleClick(true)}
          className="btn"
        >
          {buttonText}
        </button>
      ) : null}
      {children}
    </div>
  );
};

export default EmptyState;
