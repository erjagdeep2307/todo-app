import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
// Not much contents here so they will load instantly
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./components/NotFound";
import AppLayout from "./layouts/AppLayout";
import LoginSkeleton from "./Skeletons/LoginSkeleton";
// Lazy loading for the content where there is more code and functionality
const Login = lazy(() => import("./pages/public/Login"));
const SignUp = lazy(() => import("./pages/public/SignUp"));
const Dashboard = lazy(() => import("./pages/private/Dashboard"));
const Tasks = lazy(() => import("./pages/private/Tasks"));

const router = createBrowserRouter([
  //Authorized Routes
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
  // Public Routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      { 
        path:"test",
        element:<LoginSkeleton/>
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
