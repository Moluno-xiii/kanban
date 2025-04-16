import { createFileRoute } from "@tanstack/react-router";
import GoBack from "../../../../components/ui/GoBack";
import useGetOrganizationMembers from "../../../../hooks/useGetOrganizationMembers";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
import toast from "react-hot-toast";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/$organization_id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const {
    data: members,
    isPending,
    error,
  } = useGetOrganizationMembers(organization_id);

  if (isPending) return <Loading message={"Loading organization members"} />;

  if (error) {
    toast.error(error.message);
    console.error(error.message);
    return (
      <Error
        errorMessage={
          error.message || "An unexpected error occured, try again."
        }
      />
    );
  }

  console.log(members);
  return (
    <div className="flex flex-col gap-y-4">
      <GoBack route="/dashboard/organizations/other_organizations" />
      <ul className="flex flex-col gap-y-3">
        Members
        {members.map((member) => (
          <li
            key={member.member_id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="text-lg sm:text-xl">{member.member_email}</span>
            <span className="capitalize">{member.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
