import { useQuery } from "@tanstack/react-query";
import { getUserInvitation } from "../utils/invitations";

const useGetInvitation = (invitation_id: string) => {
  return useQuery({
    queryKey: ["invitation", invitation_id],
    queryFn: () => getUserInvitation(invitation_id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    select: (res) => res[0],
  });
};

export default useGetInvitation;
