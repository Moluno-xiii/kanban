import { createFileRoute, Link } from "@tanstack/react-router";
import EmptyState from "../../../../components/ui/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getOrganizations } from "../../../../utils/members";
import Loading from "../../../../components/ui/Loading";
import { FaArrowRight } from "react-icons/fa";
import { dateToString } from "../../../../utils/helperFunctions";

export const Route = createFileRoute(
  "/dashboard/organizations/other_organizations/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isPending } = useQuery({
    queryKey: ["other-organizations", user?.id as string],
    queryFn: () => getOrganizations(user?.id as string),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isPending) return <Loading message={"loading organizations"} />;

  if (!data || data.length < 1)
    return (
      <EmptyState
        button={false}
        emptyStateText="You don't belong to any secondary organizations, secondary organizations
        you belong to will appear here."
      />
    );
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-lg sm:text-xl">Other Organizations ({data.length})</p>
      <ul className="flex flex-col gap-y-3">
        {data.map((organization) => (
          <li
            key={organization.primary_key}
            className="border-secondary text-text rounded-md border p-2"
          >
            <Link
              to="/dashboard/organizations/other_organizations/$organization_id"
              params={{ organization_id: organization.organization_id }}
              className="flex flex-col gap-y-2"
            >
              <div className="flex flex-row items-center justify-between capitalize">
                {organization.organization_name}
                <FaArrowRight color="var(--color-secondary)" size={15} />
              </div>
              <span>Date Joined : {dateToString(organization.created_at)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <span></span>
    </div>
  );
}
