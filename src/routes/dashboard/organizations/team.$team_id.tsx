import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IoMdArrowBack } from "react-icons/io";
import Error from "../../../components/ui/Error";
import Loading from "../../../components/ui/Loading";
import useGetTeam from "../../../hooks/useGetTeam";

export const Route = createFileRoute("/dashboard/organizations/team/$team_id")({
  component: RouteComponent,
});
// TEam name, description, datecreated, admin email, team members, team tasks, completed/finished tasks,
// if user is not a member of the team, redirect the user. fetch team data, if user id isn't super admin or admin, redirect.
function RouteComponent() {
  const { team_id } = Route.useParams();
  const { data: team, isPending, error } = useGetTeam(team_id);
  const navigate = useNavigate();
  console.log(team);
  const data = Route.useLoaderData();
  console.log(data);

  if (isPending) return <Loading message="Loading team data" />;

  if (error) {
    return (
      <Error errorMessage={error.message || "An unexpected error occured."} />
    );
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate({ to: "/dashboard" });
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div
        aria-label="go back"
        className="text-secondary hover:text-secondary/70 flex w-fit cursor-pointer flex-row items-center gap-x-3 transition-all duration-300"
        onClick={handleBack}
      >
        <IoMdArrowBack />
        <span>Go Back</span>
      </div>
      <p className="text-lg uppercase sm:text-xl">{team.name}</p>
      <span>Created at : {team.created_at}</span>
      Hello "/dashboard/organizations/team/$team_id"! {team_id}
      <button className="btn-error self-end">Delete team</button>
    </div>
  );
}
