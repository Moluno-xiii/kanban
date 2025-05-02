import { useNavigate } from "@tanstack/react-router";
import { Dispatch, SetStateAction } from "react";
import { TaskTypes } from "../../utils/helperFunctions";

interface PropTypes {
  team_id: string;
  type: string;
  urlQuery: string;
  route: string;
  setTaskType?: Dispatch<SetStateAction<TaskTypes | undefined>>;
}

const SortingButton: React.FC<PropTypes> = ({
  team_id,
  type,
  urlQuery,
  route,
  setTaskType,
}) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label={`show ${type} tasks button.`}
      onClick={() => {
        navigate({
          to: route,
          search: () => ({ type }),
          params: { team_id },
        });
        if (!setTaskType) return;

        if (type === "all") {
          setTaskType(undefined);
        } else {
          setTaskType(type as TaskTypes);
        }
      }}
      className={`${type === urlQuery ? "text-secondary underline" : "text-text hover:text-secondary transition-all duration-200 hover:underline"} cursor-pointer capitalize sm:text-lg md:text-xl`}
    >
      {type} Tasks
    </button>
  );
};

export default SortingButton;
