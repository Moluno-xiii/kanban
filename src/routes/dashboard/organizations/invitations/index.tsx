import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const UnreadInvitations = lazy(
  () => import("../../../../components/UnreadInvitations"),
);
const ReadInvitations = lazy(
  () => import("../../../../components/ReadInvitations"),
);

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
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center gap-x-5">
        <button
          onClick={() =>
            navigate({
              to: "/dashboard/organizations/invitations",
              search: () => ({ type: "unread" }),
            })
          }
          className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "unread" ? "text-secondary underline" : "text-text"}`}
        >
          Unread invitations
        </button>
        <button
          className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "read" ? "text-secondary underline" : "text-text"}`}
          onClick={() =>
            navigate({
              to: "/dashboard/organizations/invitations",
              search: () => ({ type: "read" }),
            })
          }
        >
          Read invitations
        </button>
      </div>
      {type === "unread" ? (
        <Suspense fallback={<span>Loading unread invitations...</span>}>
          <UnreadInvitations />
        </Suspense>
      ) : null}
      {type === "read" ? (
        <Suspense fallback={<span>Loading read invitations...</span>}>
          <ReadInvitations />
        </Suspense>
      ) : null}
    </div>
  );
}
