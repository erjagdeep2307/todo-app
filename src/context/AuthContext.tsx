import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import type { AuthContextType } from "../features/todo/types/todo.types";

// 2. Define Props (no '=' sign)
interface AuthProviderProps {
  children: ReactNode;
}

// 3. Create typed Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for AuthState changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    console.log(`SingOUt is being clicked`);
    return await supabase.auth.signOut();
  };

  // React 19 syntax: render <AuthContext> directly instead of <AuthContext.Provider>
  return (
    <AuthContext value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext>
  );
};

// 4. Custom hook with safety guard
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
