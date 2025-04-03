import { IoCloseSharp } from "react-icons/io5";
interface ModalProps {
  children: React.ReactNode;
  title: string;
  handleClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, title, handleClose }) => {
  return (
    <div className="fixed inset-0 z-2 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-background text-text flex flex-col items-center gap-y-4 rounded-md p-4 drop-shadow-2xl">
        <IoCloseSharp
          className="cursor-pointer self-end"
          onClick={handleClose}
          size={16}
        />
        <p>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
