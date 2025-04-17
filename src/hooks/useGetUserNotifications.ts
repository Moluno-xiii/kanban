import { useQuery } from "@tanstack/react-query";
import { getUserNotifications } from "../utils/notifications";
import useAuthGuard from "./useAuthGuard";

const useGetUserNotifications = () => {
  const { user } = useAuthGuard();
  return useQuery({
    queryFn: () => getUserNotifications(user?.id as string),
    queryKey: ["user-notifications", user?.id as string],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetUserNotifications;
