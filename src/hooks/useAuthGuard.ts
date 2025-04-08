import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setError, setLoading, setUser } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { getSession } from "../utils/auth";
import { getUserProfile } from "../utils/profile";
import { setUserData } from "../store/userDataSlice";

export default function useAuthGuard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useRouterState();
  const pathname = route.location.pathname;
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    async function initAndGuard() {
      try {
        dispatch(setLoading({ loadingState: true }));
        const userSession = await getSession();
        const isEmailVerified =
          userSession.data.session?.user?.user_metadata?.email_verified;
        const isAuthenticated =
          userSession.data.session?.user?.aud === "authenticated";
        if (userSession.data.session?.user) {
          const { user_details, error } = await getUserProfile(
            userSession.data.session?.user.id,
          );
          if (error) throw new Error(error.message);
          if (user_details) {
            dispatch(setUserData({ data: user_details[0] }));
          }
          dispatch(
            setUser({
              user: userSession.data.session?.user,
              session: userSession.data.session,
            }),
          );
        }
        if (!isEmailVerified || !isAuthenticated) {
          if (!pathname.startsWith("/auth") && !pathname.startsWith("/auth")) {
            toast.error("You must be logged in to access this page");
            navigate({ to: "/auth/login", replace: true });
          }
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        dispatch(setError({ message }));
        toast.error(message);
        if (
          !pathname.startsWith("/auth/login") &&
          !pathname.startsWith("/auth/signup")
        ) {
          navigate({ to: "/auth/login", replace: true });
        }
      } finally {
        dispatch(setLoading({ loadingState: false }));
      }
    }

    initAndGuard();
  }, [dispatch]);

  return { loading, error, user };
}
