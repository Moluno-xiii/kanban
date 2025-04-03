import { useState } from "react";
import NavLink from "./NavLink";
import Modal from "./ui/Modal";
import { useNavigate } from "@tanstack/react-router";

export interface LinkType {
  name: string;
  route: string;
}
const navLinks: LinkType[] = [
  {
    name: "overview",
    route: "/dashboard/overview",
  },
  {
    name: "profile",
    route: "/dashboard/profile",
  },
  {
    name: "personal Projects",
    route: "/dashboard/personal_projects",
  },
  {
    name: "organizations",
    route: "/dashboard/organizations",
  },
];
const SideBar: React.FC = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogoutModal = (state: boolean) => {
    setOpenLogoutModal(state);
  };

  const navigate = useNavigate();
  const date = new Date();
  return (
    <nav className="bg-secondary relative flex h-full flex-col rounded-lg">
      <ul className="flex flex-col gap-y-5 p-3">
        {navLinks.map((link) => (
          <li key={link.name} className="w-full">
            <NavLink key={link.name} link={link} />
          </li>
        ))}
      </ul>
      <div className="absolute bottom-5 flex flex-col gap-y-3 self-center text-xl md:text-2xl">
        <a
          href="https://github.com/moluno-xiii"
          target="_blank"
          className="cursor-pointer transition-all duration-300 hover:text-white hover:underline"
        >
          &copy; Moluno {date.getFullYear()}
        </a>
        <button onClick={() => handleLogoutModal(true)} className="btn-error">
          Logout
        </button>
        {openLogoutModal && (
          <Modal
            title="Are you sure you want to Logout?"
            handleClose={() => handleLogoutModal(false)}
          >
            <div className="flex flex-row items-center justify-end gap-x-2">
              <button
                className="btn-error"
                onClick={() => navigate({ to: "/", replace: true })}
              >
                Yes
              </button>
              <button className="btn" onClick={() => handleLogoutModal(false)}>
                No
              </button>
            </div>
          </Modal>
        )}
      </div>
    </nav>
  );
};

export default SideBar;
