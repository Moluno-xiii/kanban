import { useQuery } from "@tanstack/react-query";
import { getOrganizationMember } from "../utils/members";

const useGetOrganizationMember = (
  member_id: string,
  organization_id: string,
) => {
  return useQuery({
    queryKey: ["organization-member", member_id, organization_id],
    queryFn: async () =>
      await getOrganizationMember(organization_id, member_id),
    staleTime: Infinity,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
};

export default useGetOrganizationMember;
