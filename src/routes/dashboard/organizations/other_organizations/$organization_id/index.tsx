import { createFileRoute } from "@tanstack/react-router";
import GoBack from "../../../../../components/ui/GoBack";
import useGetOrganizationMembers from "../../../../../hooks/useGetOrganizationMembers";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import toast from "react-hot-toast";
import { lazy, Suspense, useState } from "react";
import LeaveOrganizationModal from "../../../../../components/modals/LeaveOrganizationModal";
import useGetUserOrganizationRole from "../../../../../hooks/useGetUserOrganizationRole";
import { Member } from "../../../../../utils/helperFunctions.ts";
const AdminTeams = lazy(
  () => import("../../../../../components/AdminTeams.tsx"),
);
const OrganizationMembers = lazy(
  () => import("../../../../../components/OrganizationMembers.tsx"),
);

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/$organization_id/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { organization_id } = Route.useParams();
  const { data: userRole } = useGetUserOrganizationRole(organization_id);
  console.log(userRole);
  const {
    data: members,
    isPending,
    error,
  } = useGetOrganizationMembers(organization_id);
  const [isLeaveOrganizationModalOpen, setIsLeaveOrganizationModalOpen] =
    useState(false);

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

  return (
    <div className="flex flex-col gap-y-4">
      <GoBack route="/dashboard/organizations/other_organizations" />
      <ul className="flex flex-col gap-y-3">
        Members
        {members.map((member: Member) => (
          <li
            key={member.member_id}
            className="border-secondary flex flex-row items-center justify-between rounded-md border p-2"
          >
            <span className="text-lg sm:text-xl">{member.member_email}</span>
            <span className="capitalize">{member.role}</span>
            {isLeaveOrganizationModalOpen ? (
              <LeaveOrganizationModal
                closeModal={() => setIsLeaveOrganizationModalOpen(false)}
                organization_id={member.organization_id}
                user_id={member.member_id}
              />
            ) : null}
          </li>
        ))}
      </ul>
      <Suspense fallback={<span>Loading organization members...</span>}>
        <OrganizationMembers organization_id={organization_id} />
      </Suspense>
      <Suspense fallback={<span>Loading your teams...</span>}>
        <AdminTeams
          super_admin_id={members[0].super_admin_id}
          organization_id={organization_id}
        />
      </Suspense>

      <button
        className="btn-error self-end"
        onClick={() => setIsLeaveOrganizationModalOpen(true)}
      >
        Leave organization
      </button>
    </div>
  );
}
