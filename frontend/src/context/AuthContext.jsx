import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/UserService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}