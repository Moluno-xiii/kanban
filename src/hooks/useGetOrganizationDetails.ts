import { useQuery } from "@tanstack/react-query";
import { getOrganizationDetails } from "../utils/organizations";

const useGetOrganizationDetails = (organization_id: string) => {
  return useQuery({
    queryKey: ["organization-details", organization_id],
    queryFn: () => getOrganizationDetails(organization_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0],
  });
};

export default useGetOrganizationDetails;
