import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/private/Dashboard";
import Tasks from "./pages/private/Tasks";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "tasks", // Relative to /admin
        element: <Tasks />,
      },
      {
        path: "*", // Catches invalid /admin/* sub-routes inside AppLayout
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register", // Relative to /
        element: <SignUp />,
      },
      {
        path: "/*", // Catches invalid public sub-routes inside AuthLayout
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*", // Fallback for any other top-level unmatched routes
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}