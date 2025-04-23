import { useNavigate } from "@tanstack/react-router";
import { IoMdArrowBack } from "react-icons/io";

const ReturnBack: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate({ to: "/dashboard" });
    }
  };
  return (
    <div
      aria-label="go back"
      className="text-secondary hover:text-secondary/70 flex w-fit cursor-pointer flex-row items-center gap-x-3 transition-all duration-300"
      onClick={handleBack}
    >
      <IoMdArrowBack />
      <span>Go Back</span>
    </div>
  );
};

export default ReturnBack;
