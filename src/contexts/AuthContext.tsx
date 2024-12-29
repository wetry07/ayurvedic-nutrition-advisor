import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { useToast } from '../components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  signup: (email: string, password: string, userData: UserData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface UserData {
  name: string;
  dob: string;
  birthPlace: string;
  currentLocation: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  async function signup(email: string, password: string, userData: UserData) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, `users/${result.user.uid}`), userData);
      toast({
        title: "Account created successfully!",
        description: "Welcome to Ayurvedic Health Advisor",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: (error as Error).message,
      });
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: (error as Error).message,
      });
      throw error;
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Logged in successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: (error as Error).message,
      });
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: (error as Error).message,
      });
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
