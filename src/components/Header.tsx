import { CiMenuBurger } from "react-icons/ci";
import ThemeSwitcher from "./ThemeSwitcher";
import { useNavbarContext } from "../contexts/NavContext";
import { Link } from "@tanstack/react-router";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const { handleNavbarState } = useNavbarContext();
  const { profileData } = useSelector((state: RootState) => state.userData);
  return (
    <div className="border-secondary bg-background sticky top-1 z-10 mx-3 mt-3 flex flex-row items-center justify-between rounded-xl border p-3 md:mx-6 md:mt-5">
      <Link
        aria-label="link to homepage"
        className="text-secondary text-4xl"
        to="/"
      >
        Tasksphere
      </Link>
      <div className="flex flex-row items-center gap-x-2">
        <span
          aria-label="user's display name"
          className="text-secondary hidden text-xl sm:inline-block md:text-2xl"
        >
          {profileData?.display_name}
        </span>
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
