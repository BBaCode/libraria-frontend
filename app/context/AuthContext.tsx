import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface User {
  displayName: string | null;
  email: string | null;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
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
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  //   window.addEventListener("mousemove", startLogoutTimer);
  //   window.addEventListener("keydown", startLogoutTimer);

  //   return () => {
  //     window.removeEventListener("mousemove", startLogoutTimer);
  //     window.removeEventListener("keydown", startLogoutTimer);
  //   };
  // }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // setUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData));
    // startLogoutTimer();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    // try {
    //   // Make a request to your backend /users/logout endpoint
    //   const response = await fetch("http://localhost:4500/users/logout", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.ok) {
    //     setUser(null); // Clear the user state locally on successful logout
    //     clearTimeout(logoutTimer);
    //     localStorage.removeItem("user");
    //   } else {
    //     console.error("Logout failed:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error during logout:", error);
    // }
    await signOut(auth);
  };

  let logoutTimer: any;

  const startLogoutTimer = () => {
    clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      logout();
    }, 15 * 60 * 1000);
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
