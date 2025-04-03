import { Outlet, createRootRoute } from "@tanstack/react-router";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="font-macondo bg-background text-text mb-3 flex min-h-dvh min-w-dvw flex-col gap-y-6 font-semibold">
      <Header />
      <main className="min-h-[calc(100dvh-150px)]">
        <Outlet />
      </main>
    </div>
  );
}
