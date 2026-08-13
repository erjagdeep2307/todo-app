import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "sonner";
function AuthLayout() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </>
    );
  }
  if (user) {
    return <Navigate to="/admin" replace />;
  }
  return (
    <>
      <main className="min-h-dvh w-full bg-pattern px-4 py-6 sm:px-6 sm:py-6 lg:py-8 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100dvh-4rem)]">
          <section className="w-full rounded-lg bg-white p-4 shadow-md sm:p-6 lg:p-8">
            {/* Login and Register pages inject here dynamically */}
            <Outlet />
          </section>
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </>
  );
}
export default AuthLayout;
