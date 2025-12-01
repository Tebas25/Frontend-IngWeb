import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
    setLoading(false); 
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://tomas-be.totemdev.pro/login/read-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.email && data.username) {
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
