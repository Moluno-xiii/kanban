import { createFileRoute } from "@tanstack/react-router";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { membersData } from ".";
import GoBack from "../../../../../components/ui/GoBack";

export const Route = createFileRoute(
  "/dashboard/organizations/my_organizations/$organization_id/members",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  return (
    <div className="flex flex-col gap-y-4">
      <GoBack
        route={"/dashboard/organizations/my_organizations/$organization_id"}
      />
      <span>Organization : {organization_id}</span>
      <ul className="flex flex-col gap-y-2">
        {membersData.map((member) => (
          <li
            key={member.name}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2 drop-shadow-2xl"
          >
            <span>{member.name}</span>
            <div className="flex flex-row items-center gap-x-3">
              <span className="capitalize">{member.role}</span>
              <BiDotsVerticalRounded className="cursor-pointer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
