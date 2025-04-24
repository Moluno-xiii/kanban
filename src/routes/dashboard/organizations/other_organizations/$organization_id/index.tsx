import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import LeaveOrganizationModal from "../../../../../components/modals/LeaveOrganizationModal";
import Error from "../../../../../components/ui/Error";
import GoBack from "../../../../../components/ui/GoBack";
import Loading from "../../../../../components/ui/Loading";
import { useModalContext } from "../../../../../contexts/ModalContext.tsx";
import useGetOrganizationDetails from "../../../../../hooks/useGetOrganizationDetails.ts";
import useGetUserOrganizationRole from "../../../../../hooks/useGetUserOrganizationRole";
import { RootState } from "../../../../../store/index.ts";
import { dateToString } from "../../../../../utils/helperFunctions.ts";
const AdminTeams = lazy(
  () => import("../../../../../components/AdminTeams.tsx"),
);
const MemberTeams = lazy(
  () => import("../../../../../components/MemberTeams.tsx"),
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
  const { data, isPending, error } = useGetOrganizationDetails(organization_id);
  const { activeModal, handleActiveModal } = useModalContext();
  const { data: userRole } = useGetUserOrganizationRole(organization_id);
  const user_role = userRole ? userRole[0].role.toLowerCase() : null;
  console.log(user_role);
  const { user } = useSelector((state: RootState) => state.auth);

  if (isPending) return <Loading message={"Loading organization"} />;
  console.log(data);

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
      <div className="flex flex-col gap-y-2">
        <span className="text-secondary text-xl uppercase sm:text-2xl">
          {data.name}
        </span>
        <span>Description : {data.description}</span>
        <span>Date created : {dateToString(data.created_at)}</span>
      </div>
      <Suspense fallback={<span>Loading organization members...</span>}>
        <OrganizationMembers organization_id={organization_id} />
      </Suspense>
      {user_role !== "member" ? (
        <Suspense fallback={<span>Loading your teams...</span>}>
          <AdminTeams
            super_admin_id={data.super_admin_id}
            organization_id={organization_id}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<span>Loading teams...</span>}>
          <MemberTeams organization_id={organization_id} />
        </Suspense>
      )}

      <button
        className="btn-error self-end"
        onClick={() => handleActiveModal("leave organization")}
      >
        Leave organization
      </button>
      {activeModal === "leave organization" ? (
        <LeaveOrganizationModal
          closeModal={() => handleActiveModal(null)}
          organization_id={organization_id}
          user_id={user?.id as string}
        />
      ) : null}
    </div>
  );
}
