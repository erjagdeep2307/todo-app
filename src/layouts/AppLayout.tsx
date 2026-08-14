import { Suspense, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "sonner";
export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      <div className="flex flex-1 overflow-hidden pt-3 lg:pt-6">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
          avtar={user?.user_metadata?.avtar_url}
        />
        <main className="min-w-0 flex-1 min-h-0 overflow-hidden px-3 pb-1 bg-slate sm:px-6">
          <Suspense
            fallback={
              <div className="flex items-center h-full justify-center animate-ping">
                Loading...
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
}
