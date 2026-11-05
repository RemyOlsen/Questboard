import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

import GlobalStyles from "./styles/GlobalStyle";

// import "./index.css";
// import App from "./App.tsx";

const router = createRouter({ routeTree }); // Create a router instance using the route tree defined in routeTree.gen.ts
const queryClient = new QueryClient(); // Create a new instance of QueryClient for managing server state and caching with React Query

/*
  This is a TypeScript declaration merging to add the router type to the Register interface of @tanstack/react-router.
  This allows us to use the router in our components with proper type checking and autocompletion.
*/
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the application to the DOM, wrapping it with StrictMode, QueryClientProvider, and RouterProvider for state management and routing.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles
        theme={{
          colors: {
            background: "#0f0b16", // #0f0b16 is a dark purple color.
            text: "#e0e0e0", // #e0e0e0 is a light gray color for text.
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
