import { useState } from "react";
import useGetAdminTeams from "../hooks/useGetAdminTeams";
import Error from "./ui/Error";
import Loading from "./ui/Loading";
import CreateTeamModal from "./modals/CreateTeamModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TeamType } from "../utils/helperFunctions";
import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";

interface PropTypes {
  organization_id: string;
  super_admin_id: string;
}

const OrganizationMembers: React.FC<PropTypes> = ({
  organization_id,
  super_admin_id,
}) => {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(isCreateTeamModalOpen);
  const { data: teams, error, isPending } = useGetAdminTeams(organization_id);
  console.log(teams);
  if (isPending) return <Loading message="Loading organization members" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  return (
    <div>
      {teams.length >= 1 ? (
        <div className="border-secondary mt-4 flex flex-col gap-y-2 rounded-md border p-2 shadow-sm">
          <div className="flex flex-row items-center justify-between gap-3">
            <span className="text-xl md:text-2xl">Teams ({teams.length})</span>
            <button
              className="btn"
              onClick={() => setIsCreateTeamModalOpen(true)}
            >
              Add team
            </button>
          </div>
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
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center gap-y-3">
          <span className="text-center text-lg sm:text-xl">
            You haven't added any teams yet. Teams you add will appear here.
          </span>
          <button
            className="btn"
            onClick={() => setIsCreateTeamModalOpen(true)}
          >
            Add team
          </button>
        </div>
      )}
      {isCreateTeamModalOpen ? (
        <CreateTeamModal
          handleCloseModal={() => setIsCreateTeamModalOpen(false)}
          organization_id={organization_id}
          creator_id={user?.id as string}
          super_admin_id={super_admin_id}
        />
      ) : null}
    </div>
  );
};

export default OrganizationMembers;
