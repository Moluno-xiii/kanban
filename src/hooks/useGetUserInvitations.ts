import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUserInvitations } from "../utils/invitations";

const useGetUserInvitations = (status?: boolean) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryFn: () => getUserInvitations(user?.email as string, status),
    queryKey: ["user-invitations", user?.email, status],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetUserInvitations;
