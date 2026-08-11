import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ModalProvider } from "./context/TaskModalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
let queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
