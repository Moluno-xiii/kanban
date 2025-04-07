import { User } from "@supabase/supabase-js";
import { IoClose } from "react-icons/io5";
import NavLink from "./NavLink";
import Modal from "./ui/Modal";
import { LinkType } from "./SideBar";

interface NavProps {
  handleNavbarState: (state: boolean) => void;
  user: User | null;
  date: Date;
  openLogoutModal: boolean;
  handleLogoutModal: (state: boolean) => void;
  loading: boolean;
  handleLogout: () => void;
  navLinks: LinkType[];
}
const BigScreensNav = ({
  user,
  date,
  openLogoutModal,
  handleLogout,
  handleLogoutModal,
  handleNavbarState,
  loading,
  navLinks,
}: NavProps) => {
  return (
    <nav
      className="bg-secondary relative hidden h-full flex-col gap-y-4 overflow-y-hidden rounded-lg p-3 transition-all duration-500 ease-in-out lg:flex"
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
            <NavLink key={link.name} link={link} />
          </li>
        ))}
      </ul>

      <div className="absolute bottom-5 flex flex-col gap-y-3 self-center text-xl md:text-2xl">
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
          onClick={() => handleLogoutModal(true)}
          className="btn-error"
        >
          Logout
        </button>

        {openLogoutModal && (
          <Modal
            title="Are you sure you want to Logout?"
            handleClose={() => handleLogoutModal(false)}
          >
            <div className="flex flex-row items-center justify-end gap-x-2">
              <button
                disabled={loading}
                aria-label="Yes, i want to logout button"
                className="btn-error"
                onClick={handleLogout}
              >
                {!loading ? "Yes" : "Logging out"}
              </button>
              <button
                disabled={loading}
                aria-label="No, i don't want to logout button"
                className="btn"
                onClick={() => handleLogoutModal(false)}
              >
                No
              </button>
            </div>
          </Modal>
        )}
      </div>
    </nav>
  );
};

export default BigScreensNav;
