import { Link } from "@tanstack/react-router";
import { LinkType } from "./SideBar";
import { useNavbarContext } from "../contexts/NavContext";

interface NavLinkType {
  link: LinkType;
}

const NavLink = ({ link }: NavLinkType) => {
  const { handleNavbarState } = useNavbarContext();
  return (
    <Link
      onClick={() => handleNavbarState(false)}
      className="[&.active]:bg-primary bg-background hover:bg-background/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
      to={link.route}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;
