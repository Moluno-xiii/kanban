import { createFileRoute, useSearch } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import GoBack from "../../../../../../components/ui/GoBack";

const TeamSubmissions = lazy(
  () => import("../../../../../../components/TeamSubmissions"),
);

export const Route = createFileRoute(
  "/dashboard/organizations/teams/$team_id/submissions/",
)({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      type: (search.type as string) || "all",
    };
  },
});

// redirect user if they;re not an admin or a super admin

function RouteComponent() {
  const { team_id } = Route.useParams();
  const { type } = useSearch({ from: Route.id });

  return (
    <div className="flex flex-col gap-y-4">
      <GoBack route={`/dashboard/organizations/teams/${team_id}`} />
      <Suspense fallback={<span>Loading {type} submissions...</span>}>
        <TeamSubmissions type={type} team_id={team_id} />
      </Suspense>
    </div>
  );
}

// subroutes for under review, rejected, accepted
