import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { ensureProfile, type AppProfile, type ProfileUpdateInput, updateMyProfile } from '../services/profile';
import { supabase } from '../services/supabase';

export interface UserProfile extends AppProfile {}

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  user: UserProfile | null;
  logout: () => Promise<void>;
  updateProfile: (updates: ProfileUpdateInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const syncVersionRef = useRef(0);

  const syncFromAuthUser = async (nextAuthUser: User | null) => {
    const syncVersion = ++syncVersionRef.current;

    if (!nextAuthUser) {
      setAuthUser(null);
      setUser(null);
      setIsAuthenticated(false);
      setIsAuthLoading(false);
      return;
    }

    setAuthUser(nextAuthUser);
    setIsAuthenticated(true);

    try {
      const profile = await ensureProfile(nextAuthUser);
      if (syncVersionRef.current !== syncVersion) {
        return;
      }

      setUser(profile);
    } finally {
      if (syncVersionRef.current === syncVersion) {
        setIsAuthLoading(false);
      }
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      void syncFromAuthUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncFromAuthUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    syncVersionRef.current += 1;
    setAuthUser(null);
    setUser(null);
    setIsAuthenticated(false);
    setIsAuthLoading(false);
  };

  const updateProfile = async (updates: ProfileUpdateInput) => {
    if (!authUser) {
      throw new Error('Bạn cần đăng nhập để cập nhật hồ sơ.');
    }

    const updatedProfile = await updateMyProfile(authUser, updates);
    setUser(updatedProfile);

    const {
      data: { user: refreshedAuthUser },
    } = await supabase.auth.getUser();

    if (refreshedAuthUser) {
      setAuthUser(refreshedAuthUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        user,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
