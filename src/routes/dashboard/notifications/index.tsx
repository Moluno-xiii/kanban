import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Suspense, useState } from "react";
import Notifications from "../../../components/Notifications.tsx";

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
  const [readStatus, setReadStatus] = useState(false);
  const navigate = useNavigate();

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
            onClick={() => {
              navigate({
                to: "/dashboard/notifications",
                search: () => ({ type: "unread" }),
              });
              setReadStatus(false);
            }}
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "unread" ? "text-secondary underline" : "text-text"}`}
          >
            Unread notifications
          </button>
          <button
            className={`hover:text-secondary cursor-pointer text-lg transition-all duration-200 hover:underline md:text-xl ${type === "read" ? "text-secondary underline" : "text-text"}`}
            onClick={() => {
              navigate({
                to: "/dashboard/notifications",
                search: () => ({ type: "read" }),
              });
              setReadStatus(true);
            }}
          >
            Read notifications
          </button>
        </div>
        <Suspense fallback={<span>Loading {type} notifications...</span>}>
          <Notifications type={type} readStatus={readStatus} />
        </Suspense>
      </div>
    </div>
  );
}
