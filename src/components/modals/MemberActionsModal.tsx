// import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { IoClose } from "react-icons/io5";

interface PropTypes {
  isOpen: boolean;
  memberLink: string;
  onClose: () => void;
}

const MemberActionsModal: React.FC<PropTypes> = ({ memberLink, onClose }) => {
  const navigate = useNavigate();
  return (
    <ul className="border-secondary bg-secondary absolute top-0 left-0 z-20 flex w-[150px] flex-col gap-y-2 rounded-xl border p-2">
      <IoClose className="cursor-pointer self-end" onClick={onClose} />
      <li>
        <button onClick={() => navigate({ to: memberLink })} className="btn">
          View member
        </button>
      </li>
      <li>
        <button className="btn-error">Delete member</button>
      </li>
    </ul>
  );
};

export default MemberActionsModal;
