import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { Toaster } from "react-hot-toast";

// 1. Ensure the queryClient is instantiated
const queryClient = new QueryClient();

// 2. Use non-null assertion (!) for the root element
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
  <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      fontSize: "14px",
      fontFamily: "Poppins, sans-serif",
    },
  }}
/>
    <QueryClientProvider client={queryClient}>

      <Provider store={store}>
        {/* 3. PersistGate requires the 'persistor' prop and optional 'loading' */}
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
