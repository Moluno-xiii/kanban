import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { initializeUser } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loading from "../components/ui/Loading";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (loading) return <Loading message="Loading user data..." />;
  return (
    <div className="font-macondo bg-background text-text mb-3 flex min-h-dvh min-w-dvw flex-col gap-y-6 font-semibold">
      <Header />
      <Toaster />
      <main className="min-h-[calc(100dvh-150px)]">
        <Outlet />
      </main>
    </div>
  );
}
