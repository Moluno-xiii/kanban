import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen.ts";
import "./index.css";
import NotFound from "./components/NotFound.tsx";
import NavbarContextProvider from "./contexts/NavContext.tsx";

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavbarContextProvider>
      <RouterProvider router={router} />
    </NavbarContextProvider>
  </StrictMode>,
);
