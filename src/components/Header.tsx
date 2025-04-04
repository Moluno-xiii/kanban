import { CiMenuBurger } from "react-icons/ci";
import ThemeSwitcher from "./ThemeSwitcher";
import { useNavbarContext } from "../contexts/NavContext";

const Header: React.FC = () => {
  const { handleNavbarState } = useNavbarContext();
  return (
    <div className="border-secondary bg-background sticky top-1 z-10 mx-3 mt-3 flex flex-row items-center justify-between rounded-xl border p-3 md:mx-6 md:mt-5">
      <span className="text-secondary text-4xl">Tasksphere</span>
      <div className="flex flex-row items-center gap-x-2">
        <CiMenuBurger
          className="text-secondary hover:text-secondary/70 size-8 cursor-pointer self-end transition-all duration-300 hover:rotate-180 lg:hidden"
          aria-label="open sidebar button"
          onClick={() => handleNavbarState(true)}
        />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
