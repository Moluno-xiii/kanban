import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/profile";

function useUserProfile(userId: string) {
  return useSuspenseQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId),
    select: (res) => res.user_details?.[0],
    staleTime: Infinity,
    refetchOnMount: false,
  });
}

export default useUserProfile;
