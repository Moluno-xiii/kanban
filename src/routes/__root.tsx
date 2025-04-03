import { Outlet, createRootRoute } from "@tanstack/react-router";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="font-macondo bg-background text-text mb-3 flex min-h-dvh min-w-dvw flex-col gap-y-6 font-semibold">
      <Header />
      <div className="grid min-h-dvh grid-cols-[300px_1fr] gap-5 px-3 md:px-6">
        <aside>
          <SideBar />
        </aside>
        <main className="bg-primary mx-auto w-full max-w-7xl rounded-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
