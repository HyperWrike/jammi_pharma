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
    const checkState = () => {
      const hasLocalSession = sessionStorage.getItem("jammi_admin_session") === "true" || 
                             localStorage.getItem("jammi_admin_session") === "true" ||
                             localStorage.getItem("jammi_cms_session") === "true";
      
      if (hasLocalSession) {
        setIsAdmin(true);
        const editMode = sessionStorage.getItem("jammi_edit_mode") || localStorage.getItem("jammi_edit_mode");
        if (editMode === "true") {
          setIsEditMode(true);
        }
      } else {
        setIsAdmin(false);
        setIsEditMode(false);
      }
    };

    checkState();

    window.addEventListener('jammi_cms_unlocked', checkState);
    window.addEventListener('storage', checkState);

    return () => {
      window.removeEventListener('jammi_cms_unlocked', checkState);
      window.removeEventListener('storage', checkState);
    };
  }, []);

  const handleSetEditMode = (val: boolean) => {
    setIsEditMode(val);
    const s = val ? "true" : "false";
    sessionStorage.setItem("jammi_edit_mode", s);
    localStorage.setItem("jammi_edit_mode", s);
  };

  const logout = async () => {
    sessionStorage.removeItem("jammi_admin_session");
    sessionStorage.removeItem("jammi_edit_mode");
    localStorage.removeItem("jammi_admin_session");
    localStorage.removeItem("jammi_cms_session");
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
