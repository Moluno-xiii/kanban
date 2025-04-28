import { useQuery } from "@tanstack/react-query";
import { getMemberRole } from "../utils/members";
import useAuthGuard from "./useAuthGuard";

const useGetUserOrganizationRole = (organization_id: string) => {
  const { user } = useAuthGuard();
  return useQuery({
    queryKey: ["user-role", user?.id as string, organization_id],
    queryFn: async () =>
      await getMemberRole(user?.id as string, organization_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: (res) => res[0].role,
  });
};

export default useGetUserOrganizationRole;
