// @ts-ignore
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";

import { router } from "./router/Router.tsx";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { GlobalStyles } from "../globalStyles.ts";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
