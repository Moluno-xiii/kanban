import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/profile";

function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => await getUserProfile(userId),
    enabled: !!userId,
    select: (res) => res?.[0],
    staleTime: Infinity,
    refetchOnMount: false,
  });
}

export default useUserProfile;
