
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type GuestUser = {
  id: string;
  email: string;
  role: 'guest';
};

type AuthContextType = {
  session: Session | null;
  user: User | GuestUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  isGuest: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER_KEY = 'guest_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | GuestUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for guest user in localStorage
    const guestUser = localStorage.getItem(GUEST_USER_KEY);
    if (guestUser) {
      console.log("Found guest user in localStorage", JSON.parse(guestUser));
      setUser(JSON.parse(guestUser));
      setIsGuest(true);
      setLoading(false);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          setIsGuest(false);
          
          if (event === 'SIGNED_IN') {
            console.log("User signed in successfully");
            toast.success("Signed in successfully");
          }
        } else {
          setSession(null);
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInAsGuest = async () => {
    try {
      const guestUser: GuestUser = {
        id: `guest_${Date.now()}`,
        email: `guest_${Date.now()}@guest.com`,
        role: 'guest'
      };
      localStorage.setItem(GUEST_USER_KEY, JSON.stringify(guestUser));
      setUser(guestUser);
      setIsGuest(true);
      setSession(null);
      toast.success("Signed in as guest");
      console.log("Signed in as guest user", guestUser);
    } catch (error: any) {
      toast.error(error.message || "Error signing in as guest");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Error during sign in:", error);
        throw error;
      }
      
      console.log("Sign in successful:", data.user?.email);
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      toast.success("Sign up successful! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      throw error;
    }
  };

  const signOut = async () => {
    console.log("Sign out triggered. Current user:", user?.email);
    console.log("Is guest user:", isGuest);
    
    try {
      if (isGuest) {
        console.log("Signing out guest user");
        localStorage.removeItem(GUEST_USER_KEY);
        // Also remove guest websites
        localStorage.removeItem('guest_websites');
        setUser(null);
        setIsGuest(false);
        toast.success("Signed out successfully");
      } else {
        console.log("Signing out authenticated user");
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        toast.success("Signed out successfully");
      }
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast.error(error.message || "Error signing out");
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInAsGuest,
    isGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
