import { Link } from "@tanstack/react-router";
import { LinkType } from "./SideBar";

interface NavLinkType {
  link: LinkType;
}

const NavLink = ({ link }: NavLinkType) => {
  return (
    <Link
      aria-label={`link to ${link.name} page`}
      className="[&.active]:bg-primary bg-background hover:bg-background/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
      to={link.route}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;
