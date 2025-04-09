import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../utils/profile";

function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
    select: (res) => res.user_details?.[0],
  });
}

export default useUserProfile;
