import { useQuery } from "@tanstack/react-query";
import { getUserInvitation } from "../utils/invitations";

const useGetInvitation = (invitation_id: string) => {
  return useQuery({
    queryKey: ["invitation", invitation_id],
    queryFn: () => getUserInvitation(invitation_id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetInvitation;
