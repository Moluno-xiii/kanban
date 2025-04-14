import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavbarContext } from "../contexts/NavContext";
import { RootState } from "../store";
import { logout, setLoading } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../utils/auth";
import SmallScreensNav from "./SmallScreensNav";
import BigScreensNav from "./BigScreensNav";
import useGetUserNotifications from "../hooks/useGetUserInvitations";
import useAuthGuard from "../hooks/useAuthGuard";

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
    route: "/dashboard/organizations/",
  },
  {
    name: "notifications",
    route: "/dashboard/notifications",
  },
];

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { user } = useAuthGuard();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { handleNavbarState, isNavBarOpen } = useNavbarContext();

  const handleLogoutModal = (state: boolean) => {
    setOpenLogoutModal(state);
  };
  const { data } = useGetUserNotifications();

  async function handleLogout() {
    try {
      dispatch(setLoading({ loadingState: true }));
      await logoutUser();
      navigate({ to: "/", replace: true });
      toast.success("Logout successful");
      dispatch(logout());
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occured";
      toast.error(message);
    }
  }

  const navigate = useNavigate();
  const date = new Date();
  return (
    <div className="h-full">
      <BigScreensNav
        navLinks={navLinks}
        handleNavbarState={handleNavbarState}
        user={user}
        date={date}
        openLogoutModal={openLogoutModal}
        handleLogoutModal={handleLogoutModal}
        loading={loading}
        handleLogout={handleLogout}
        notificationData={data || []}
      />
      {isNavBarOpen ? (
        <SmallScreensNav
          navLinks={navLinks}
          handleNavbarState={handleNavbarState}
          user={user}
          date={date}
          openLogoutModal={openLogoutModal}
          handleLogoutModal={handleLogoutModal}
          loading={loading}
          handleLogout={handleLogout}
          isNavBarOpen={isNavBarOpen}
          notificationData={data || []}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
