import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Loading from "../../../components/ui/Loading";
import UnreadNotifications from "../../../components/UnreadNotifications.tsx";
import useGetUserNotifications from "../../../hooks/useGetUserNotifications";

const ReadNotifications = lazy(
  () => import("../../../components/ReadNotifications.tsx"),
);

export const Route = createFileRoute("/dashboard/notifications/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "unread",
    };
  },
});

function RouteComponent() {
  const { type } = useSearch({ from: Route.id });
  const { data: notifications, isPending } = useGetUserNotifications(false);
  const navigate = useNavigate();

  if (isPending) return <Loading message={"Loading user notifications"} />;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between">
          <span className="text-secondary text-xl md:text-2xl">
            Notifications
          </span>
        </div>

        <div className="flex flex-row items-center gap-x-5">
          <button
            onClick={() =>
              navigate({
                to: "/dashboard/notifications",
                search: () => ({ type: "unread" }),
              })
            }
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "unread" ? "text-secondary underline" : "text-text"}`}
          >
            Unread notifications
          </button>
          <button
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "read" ? "text-secondary underline" : "text-text"}`}
            onClick={() =>
              navigate({
                to: "/dashboard/notifications",
                search: () => ({ type: "read" }),
              })
            }
          >
            Read notifications
          </button>
        </div>
        {type === "unread" ? (
          <UnreadNotifications
            notifications={notifications ? notifications : []}
          />
        ) : null}

        {type === "read" ? (
          <Suspense fallback={<span>Loading read notifications...</span>}>
            <ReadNotifications />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}
