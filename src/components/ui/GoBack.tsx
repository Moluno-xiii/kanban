import { Link } from "@tanstack/react-router";
import { IoMdArrowBack } from "react-icons/io";

const GoBack = ({ route }: { route: string }) => {
  return (
    <Link
      aria-label="go back"
      to={route}
      className="text-secondary hover:text-secondary/70 flex w-fit flex-row items-center gap-x-3 transition-all duration-300"
    >
      <IoMdArrowBack />
      Go Back
    </Link>
  );
};

export default GoBack;
