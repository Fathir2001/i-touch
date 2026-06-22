import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { adminLogin } from "../services/resources";

const AuthContext = createContext(null);

const STORAGE_KEY = "itouch_admin";

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (admin) localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    else localStorage.removeItem(STORAGE_KEY);
  }, [admin]);

  const login = useCallback(async (email, password) => {
    const { data } = await adminLogin({ email, password });
    setAdmin(data);
    return data;
  }, []);

  const logout = useCallback(() => setAdmin(null), []);

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
