import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/notifications/")({
  component: RouteComponent,
});

export const notificationsData = [
  {
    id: "1",
    message: "something's happening",
    read: true,
  },
  {
    id: "2",
    message: "something else's happening",
    read: false,
  },
  {
    id: "3",
    message: "Nothing's happening",
    read: true,
  },
];
const readMessages = [
  {
    id: "1",
    message: "something's happening",
    read: true,
  },
  {
    id: "2",
    message: "something else's happening",
    read: false,
  },
  {
    id: "3",
    message: "Nothing's happening",
    read: true,
  },
];
function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-4">
      {notificationsData.length < 1 ? (
        <span>You don't have any notifications.</span>
      ) : null}

      <ul className="flex flex-col gap-y-2">
        <span className="text-xl md:text-2xl">Notifications</span>
        {notificationsData.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
            <button className="text-primary w-fit text-sm transition-all duration-200 first-letter:capitalize hover:underline">
              mark as read
            </button>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-col gap-y-2">
        <span className="text-xl md:text-2xl">Read notifications</span>
        {readMessages.map((notification) => (
          <li
            key={notification.id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="first-letter:uppercase">
              {notification.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
