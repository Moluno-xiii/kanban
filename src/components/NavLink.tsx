import { Link } from "@tanstack/react-router";
import { LinkType } from "./SideBar";
import {
  InvitationNotification,
  NotificationType,
} from "../utils/helperFunctions";

interface NavLinkType {
  link: LinkType;
  onClick?: () => void;
  invitations: InvitationNotification[];
  notifications: NotificationType[];
}

const NavLink = ({
  link,
  onClick,
  invitations,
  notifications,
}: NavLinkType) => {
  return (
    <Link
      onClick={onClick}
      aria-label={`link to ${link.name} page`}
      className="[&.active]:bg-primary bg-background hover:bg-background/70 flex rounded-md px-4 py-2 capitalize transition-all duration-300 [&.active]:font-bold"
      to={link.route}
      preload="intent"
    >
      {link.name}
      {invitations.length > 0 &&
      invitations[0].read === false &&
      link.name === "organizations" ? (
        <span className="bg-text absolute right-4 size-2 rounded-full"></span>
      ) : null}
      {notifications.length > 0 && link.name === "notifications" ? (
        <span className="bg-text absolute right-4 size-2 rounded-full"></span>
      ) : null}
    </Link>
  );
};

export default NavLink;
