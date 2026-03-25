"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check for admin session and edit mode on mount
    const checkState = async () => {
      const { data: { session } } = await import('../../lib/supabase').then(m => m.supabase.auth.getSession());
      const hasLocalSession = sessionStorage.getItem("jammi_admin_session") === "true";
      
      if (session || hasLocalSession) {
        setIsAdmin(true);
        const editMode = sessionStorage.getItem("jammi_edit_mode");
        if (editMode === "true") {
          setIsEditMode(true);
        }
      } else {
        setIsAdmin(false);
        setIsEditMode(false);
      }
    };

    checkState();

    let authListener: any = null;
    import('../../lib/supabase').then(({ supabase }) => {
       const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
             setIsAdmin(true);
          } else {
             // Only log out if there's no UI local override for edge cases
             if (sessionStorage.getItem("jammi_admin_session") !== "true") {
                setIsAdmin(false);
                setIsEditMode(false);
             }
          }
       });
       authListener = data.subscription;
    });

    return () => {
       if (authListener) authListener.unsubscribe();
    };
  }, []);

  const handleSetEditMode = (val: boolean) => {
    setIsEditMode(val);
    sessionStorage.setItem("jammi_edit_mode", val ? "true" : "false");
  };

  const logout = async () => {
    const { supabase } = await import('../../lib/supabase');
    if (supabase) await supabase.auth.signOut();
    sessionStorage.removeItem("jammi_admin_session");
    sessionStorage.removeItem("jammi_edit_mode");
    setIsAdmin(false);
    setIsEditMode(false);
    window.location.reload();
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isEditMode, setIsEditMode: handleSetEditMode, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
