import { Link, useNavigate } from "@tanstack/react-router";
import { CiMenuBurger } from "react-icons/ci";
import { useNavbarContext } from "../contexts/NavContext";
import useAuthGuard from "../hooks/useAuthGuard";
import ThemeSwitcher from "./ThemeSwitcher";
import useUserProfile from "../hooks/useUserProfile";

const Header: React.FC = () => {
  const { handleNavbarState } = useNavbarContext();
  const { user } = useAuthGuard();
  const { data: profileData } = useUserProfile(user?.id as string);
  const navigate = useNavigate();

  let userInitials = "";
  profileData?.display_name
    .split(" ")
    .forEach((word: string) => (userInitials += word[0]));

  return (
    <div className="border-secondary bg-background sticky top-1 z-10 mx-3 mt-3 flex flex-row items-center justify-between rounded-xl border p-3 md:top-1 md:mx-6 md:mt-5">
      <Link
        aria-label="link to homepage"
        className="text-secondary text-4xl"
        to="/"
      >
        Tasksphere
      </Link>
      <div className="flex flex-row items-center gap-x-2 sm:gap-x-4">
        {profileData?.profile_picture ? (
          <img
            src={profileData?.profile_picture}
            alt="User profile picture"
            className="ring-secondary size-10 cursor-pointer rounded-full ring-2 ring-offset-0 transition-all duration-300 hover:rotate-180"
            onClick={() => navigate({ to: "/dashboard/profile" })}
          />
        ) : null}
        {userInitials.length > 0 ? (
          <span
            aria-label="user's initials"
            className="text-secondary border-secondary hidden size-12 cursor-pointer flex-row items-center justify-center rounded-full border text-center text-xl uppercase transition-all duration-300 hover:rotate-180 sm:flex md:text-2xl"
            onClick={() => navigate({ to: "/dashboard/profile" })}
          >
            {userInitials}
          </span>
        ) : (
          <span
            aria-label="user's display name"
            className="text-secondary hidden text-xl first-letter:capitalize sm:inline-block md:text-2xl"
            onClick={() => navigate({ to: "/dashboard/profile" })}
          >
            {profileData?.display_name}
          </span>
        )}
        <CiMenuBurger
          className="text-secondary hover:text-secondary/70 size-8 cursor-pointer self-end transition-all duration-300 hover:rotate-180 lg:hidden"
          aria-label="open sidebar icon"
          onClick={() => handleNavbarState(true)}
        />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
