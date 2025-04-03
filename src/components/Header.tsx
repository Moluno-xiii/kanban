// import { CiMenuBurger } from "react-icons/ci";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <div className="border-secondary bg-background sticky top-1 z-10 mx-3 mt-3 flex flex-row items-center justify-between rounded-xl border p-3 md:mx-6 md:mt-5">
      <span className="text-secondary text-4xl">Tasksphere</span>
      <div>{/* <CiMenuBurger /> */}</div>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
