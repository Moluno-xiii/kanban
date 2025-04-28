import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavbarContext } from "../contexts/NavContext";
import useAuthGuard from "../hooks/useAuthGuard";
import useGetUserInvitations from "../hooks/useGetUserInvitations";
import useGetUserNotifications from "../hooks/useGetUserNotifications";
import { RootState } from "../store";
import { logout, setLoading } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../utils/auth";
import BigScreensNav from "./BigScreensNav";
import SmallScreensNav from "./SmallScreensNav";
import { useModalContext } from "../contexts/ModalContext";

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
    route: "/dashboard/notifications?type=unread",
  },
];

const SideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { user } = useAuthGuard();
  const { handleNavbarState, isNavBarOpen } = useNavbarContext();
  const { handleActiveModal } = useModalContext();

  const { data: invitations } = useGetUserInvitations(false);
  const { data: notifications } = useGetUserNotifications(false);

  async function handleLogout() {
    try {
      dispatch(setLoading({ loadingState: true }));
      await logoutUser();
      navigate({ to: "/", replace: true });
      toast.success("Logout successful");
      handleActiveModal(null);
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
    <div className="fixed top-28 bottom-3 z-20 min-h-[calc(100dvh-150px)] w-[200px] sm:w-[300px]">
      <BigScreensNav
        navLinks={navLinks}
        handleNavbarState={handleNavbarState}
        user={user}
        date={date}
        loading={loading}
        handleLogout={handleLogout}
        invitations={invitations || []}
        notifications={notifications || []}
      />
      {isNavBarOpen ? (
        <SmallScreensNav
          navLinks={navLinks}
          handleNavbarState={handleNavbarState}
          user={user}
          date={date}
          loading={loading}
          handleLogout={handleLogout}
          isNavBarOpen={isNavBarOpen}
          invitations={invitations || []}
          notifications={notifications || []}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SideBar;
