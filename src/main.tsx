import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import NotFound from "./components/NotFound.tsx";
import NavbarContextProvider from "./contexts/NavContext.tsx";
import "./index.css";
import { routeTree } from "./routeTree.gen.ts";
import { store } from "./store/index.ts";

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavbarContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </NavbarContextProvider>
  </StrictMode>,
);
