import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../utils/teams";

const useGetOrganizationTeams = (
  organization_id: string,
  super_admin_id: string,
) => {
  return useQuery({
    queryKey: ["organization-teams", organization_id],
    queryFn: async () => await getTeams(super_admin_id, organization_id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetOrganizationTeams;
