import { User } from "@supabase/supabase-js";
import { IoClose } from "react-icons/io5";
import NavLink from "./NavLink";
import Modal from "./ui/Modal";
import { LinkType } from "./SideBar";
import {
  InvitationNotification,
  NotificationType,
} from "../utils/helperFunctions";
import { useModalContext } from "../contexts/ModalContext";

interface NavProps {
  handleNavbarState: (state: boolean) => void;
  user: User | null;
  date: Date;
  loading: boolean;
  handleLogout: () => void;
  navLinks: LinkType[];
  invitations: InvitationNotification[];
  notifications: NotificationType[];
}
const BigScreensNav = ({
  user,
  date,
  handleLogout,
  handleNavbarState,
  loading,
  navLinks,
  invitations,
  notifications,
}: NavProps) => {
  const { activeModal, handleActiveModal } = useModalContext();

  return (
    <nav
      className="bg-secondary relative hidden min-h-[calc(100dvh-150px)] flex-col gap-y-4 overflow-y-hidden rounded-lg p-3 transition-all duration-500 ease-in-out lg:flex"
      aria-label="navigation links menu"
    >
      <IoClose
        aria-label="close sidebar button"
        onClick={() => handleNavbarState(false)}
        className="text-error block cursor-pointer self-end lg:hidden"
      />
      <ul className="flex flex-col gap-y-5">
        {navLinks.map((link) => (
          <li key={link.name} className="w-full">
            <NavLink
              key={link.name}
              link={link}
              invitations={invitations}
              notifications={notifications}
            />
          </li>
        ))}
      </ul>

      <div className="absolute bottom-5 flex flex-col gap-y-2 self-center text-center text-xl">
        <p className="text-base">{user?.email}</p>

        <a
          href="https://github.com/moluno-xiii"
          target="_blank"
          className="cursor-pointer transition-all duration-300 hover:text-white hover:underline"
        >
          &copy; Moluno {date.getFullYear()}
        </a>
        <button
          aria-label="logout button"
          onClick={() => handleActiveModal("logout")}
          className="btn-error"
        >
          Logout
        </button>

        {activeModal === "logout" ? (
          <Modal
            title="Are you sure you want to Logout?"
            handleClose={() => handleActiveModal(null)}
          >
            <div className="flex flex-row items-center justify-end gap-x-2">
              <button
                disabled={loading}
                aria-label="Yes, i want to logout button"
                className="btn-error"
                onClick={handleLogout}
              >
                {!loading ? "Yes" : "Logging out..."}
              </button>
              <button
                disabled={loading}
                aria-label="No, i don't want to logout button"
                className="btn"
                onClick={() => handleActiveModal(null)}
              >
                No
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    </nav>
  );
};

export default BigScreensNav;
