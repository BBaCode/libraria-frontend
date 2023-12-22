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
  uid: string;
  displayName: string | null;
  email: string | null;
}
interface AuthContextType {
  user: User | null;
  error: String | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [error, setError] = useState<String | null>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
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

  const redirectToHome = async () => {
    (await user?.displayName) !== null;
    router.push("/");
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(`Welcome ${userCredential.user?.displayName || "User"}`);
      if (error) setError(null);
      redirectToHome();
    } catch (error: any) {
      console.log(error); // Log the error for debugging purposes
      setError("Failed to login. Please try again.");
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const contextValue: AuthContextType = {
    user,
    error,
    loading,
    setUser,
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

  const redirectToHome = async () => {
    router.push("/");
  };
  return { ...context, redirectToHome };
};
