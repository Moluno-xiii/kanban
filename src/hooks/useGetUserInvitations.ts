import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getUserInvitations } from "../utils/invitations";

const useGetUserInvitations = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return useQuery({
    queryFn: () => getUserInvitations(user?.email as string),
    queryKey: ["user-notifications", user?.email],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetUserInvitations;
