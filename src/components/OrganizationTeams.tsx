import useGetOrganizationTeams from "../hooks/useGetOrganizationTeams";
import Loading from "./ui/Loading";
import Error from "./ui/Error";
import { TeamType } from "../utils/helperFunctions";
import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";

interface PropTypes {
  super_admin_id: string;
  organization_id: string;
}

const OrganizationTeams: React.FC<PropTypes> = ({
  organization_id,
  super_admin_id,
}) => {
  const {
    data: teams,
    error,
    isPending,
  } = useGetOrganizationTeams(organization_id, super_admin_id);

  if (error)
    return (
      <Error errorMessage={error.message || "An unexpected error occured"} />
    );

  if (isPending) return <Loading message={"Loading teams"} />;

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-secondary text-xl sm:text-2xl">
        Teams ({teams?.length})
      </p>
      {teams.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {teams.map((team: TeamType) => (
            <li
              key={team.id}
              className="border-secondary rounded-md border p-2"
            >
              <div className="flex flex-row items-center justify-between">
                <span className="text-lg first-letter:capitalize sm:text-xl">
                  {team.name}
                </span>
                <Link
                  to="/dashboard/organizations/team/$team_id"
                  params={{ team_id: team.id }}
                  className="text-secondary flex flex-row items-center gap-x-2 transition-all duration-200 hover:underline"
                >
                  <span>View team</span>
                  <FaArrowRight />
                </Link>
              </div>
              <span>Description : {team.description}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-center text-xl sm:text-2xl">
          No teams yet, existing teams will appear here.
        </span>
      )}
    </div>
  );
};

export default OrganizationTeams;
