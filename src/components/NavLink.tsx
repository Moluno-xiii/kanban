import { Link } from "@tanstack/react-router";
import { LinkType } from "./SideBar";
import { InvitationNotification } from "../utils/helperFunctions";

interface NavLinkType {
  link: LinkType;
  onClick?: () => void;
  notificationData: InvitationNotification[];
}

const NavLink = ({ link, onClick, notificationData }: NavLinkType) => {
  return (
    <Link
      onClick={onClick}
      aria-label={`link to ${link.name} page`}
      className="[&.active]:bg-primary bg-background hover:bg-background/80 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
      to={link.route}
      preload="intent"
    >
      {link.name}
      {notificationData.length > 0 && link.name === "organizations" ? (
        <span className="bg-text absolute right-4 size-2 rounded-full"></span>
      ) : null}
    </Link>
  );
};

export default NavLink;
