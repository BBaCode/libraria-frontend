import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  displayName: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  redirectToHome: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Make a request to your backend /users/logout endpoint
      const response = await fetch("http://localhost:4500/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null); // Clear the user state locally on successful logout
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const redirectToHome = () => {
    router.push("/");
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    redirectToHome,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const redirectToHome = () => {
    router.push("/");
  };
  return { ...context, redirectToHome };
};
