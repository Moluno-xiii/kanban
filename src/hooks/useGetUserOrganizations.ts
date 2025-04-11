import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getAdminUserOrganizations } from "../utils/organizations";

const useGetUserOrganizations = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryFn: () => getAdminUserOrganizations(user?.id as string),
    queryKey: ["organizations", user?.id as string],
    enabled: !!user?.id,
    select: (res) => res.organizations,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetUserOrganizations;
