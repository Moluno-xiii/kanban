import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Suspense, useState } from "react";
import Invitations from "../../../../components/Invitations";

export const Route = createFileRoute("/dashboard/organizations/invitations/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "unread",
    };
  },
});

function RouteComponent() {
  const { type } = useSearch({ from: Route.id });
  const [invitationStatus, setInvitationStatus] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-5">
        <button
          onClick={() => {
            navigate({
              to: "/dashboard/organizations/invitations",
              search: () => ({ type: "unread" }),
            });
            setInvitationStatus(false);
          }}
          className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "unread" ? "text-secondary underline" : "text-text"}`}
        >
          Unread invitations
        </button>
        <button
          className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "read" ? "text-secondary underline" : "text-text"}`}
          onClick={() => {
            navigate({
              to: "/dashboard/organizations/invitations",
              search: () => ({ type: "read" }),
            });
            setInvitationStatus(true);
          }}
        >
          Read invitations
        </button>
      </div>
      <Suspense fallback={<span>Loading {type} invitations...</span>}>
        <Invitations invitationStatus={invitationStatus} type={type} />
      </Suspense>
    </div>
  );
}
