import { IoCloseSharp } from "react-icons/io5";
interface ModalProps {
  children: React.ReactNode;
  title: string;
  handleClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, title, handleClose }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="text-text bg-background mx-5 flex flex-col items-center gap-y-4 rounded-md p-4 drop-shadow-2xl max-sm:w-full">
        <IoCloseSharp
          aria-label="Close modal button"
          className="cursor-pointer self-end"
          onClick={handleClose}
          size={16}
        />
        <p aria-label="Modal title" className="text-center text-xl md:text-2xl">
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
