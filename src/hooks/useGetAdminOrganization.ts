import { useSuspenseQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getAdminUserOrganization } from "../utils/organizations";

const useGetAdminOrganization = (organization_id: string) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useSuspenseQuery({
    queryKey: ["organization", organization_id],
    queryFn: () =>
      getAdminUserOrganization(user?.id as string, organization_id),
    select: (res) => res.organizations[0],
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetAdminOrganization;
