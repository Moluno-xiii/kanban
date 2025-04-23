import { useQuery } from "@tanstack/react-query";
import { getAdminTeams } from "../utils/teams";
import useAuthGuard from "./useAuthGuard";

const useGetAdminTeams = (organization_id: string) => {
  const { user } = useAuthGuard();
  return useQuery({
    queryKey: ["admin-teams", user?.id as string, organization_id],
    queryFn: () => getAdminTeams(user?.id as string, organization_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAdminTeams;
