import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState } from "../store";
import { useAppDispatch } from "../store/hooks";
import { initializeUser, setError } from "../store/authSlice";

// export default function useAuthGuard() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, error, user } = useSelector(
//     (state: RootState) => state.auth,
//   );

//   useEffect(() => {
//     async function initAndGuard() {
//       try {
//         console.log("trying auth check");
//         const result = await dispatch(initializeUser()).unwrap();
//         const isAuthenticated = result.user?.aud === "authenticated";
//         const isEmailVerified = result.user?.user_metadata?.email_verified;
//         console.log("auth check completed");
//         if (!isAuthenticated || !isEmailVerified) {
//           toast.error("You must be logged in to access this page");
//           console.log("no user");
//           navigate({ to: "/auth/login", replace: true });
//         }
//       } catch (err: unknown) {
//         const message =
//           err instanceof Error ? err.message : "Something went wrong";
//         console.warn("Auth Guard Error:", message);
//         dispatch(setError({ message }));
//         toast.error(message);
//         navigate({ to: "/auth/login", replace: true });
//       }
//     }

//     initAndGuard();
//   }, [dispatch, navigate]);

//   return { loading, error, user };
// }

import { useRouterState } from "@tanstack/react-router";

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
        const result = await dispatch(initializeUser()).unwrap();
        const isAuthenticated = result.user?.aud === "authenticated";
        const isEmailVerified = result.user?.user_metadata?.email_verified;

        if (!isAuthenticated || !isEmailVerified) {
          if (
            !pathname.startsWith("/auth/login") &&
            !pathname.startsWith("/auth/signup")
          ) {
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
      }
    }

    initAndGuard();
  }, [dispatch, navigate, pathname]);

  return { loading, error, user };
}
