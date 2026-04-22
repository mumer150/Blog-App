import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContext } from "./context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContext>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ToastContext>
  </BrowserRouter>,
);
