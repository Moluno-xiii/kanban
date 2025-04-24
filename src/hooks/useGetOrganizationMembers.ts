import { useQuery } from "@tanstack/react-query";
import { getOrganizationMembers } from "../utils/members";

const useGetOrganizationMembers = (organization_id: string, role?: string) => {
  return useQuery({
    queryKey: ["organization-members", organization_id],
    queryFn: () => getOrganizationMembers(organization_id, role),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetOrganizationMembers;
