import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "sonner";
import { Suspense } from "react";
import LoginSkeleton from "../Skeletons/LoginSkeleton";

function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      {/* ⚡ FIX 1: Make main a full-screen flex container with overflow-hidden */}
      <main className="flex min-h-dvh w-full items-center justify-center bg-pattern px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 overflow-hidden">
        
        {/* ⚡ FIX 2: Let flexbox handle centering naturally without manual calc() math */}
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
          
          <section className="w-full overflow-hidden rounded-lg bg-white p-4 shadow-md sm:p-6 lg:p-8">
            <Suspense fallback={<LoginSkeleton />}>
              <Outlet />
            </Suspense>
          </section>
          
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default AuthLayout;