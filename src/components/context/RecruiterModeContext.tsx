"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type RecruiterModeContextType = {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
};

const RecruiterModeContext = createContext<RecruiterModeContextType | undefined>(undefined);

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [targetRole, setTargetRole] = useState("AI Engineer"); // Default role

  useEffect(() => {
    // Load persisted role from localStorage
    const savedRole = localStorage.getItem("portfolio_target_role");
    if (savedRole) {
      setTargetRole(savedRole);
    }
  }, []);

  const handleSetTargetRole = (role: string) => {
    setTargetRole(role);
    localStorage.setItem("portfolio_target_role", role);
  };

  const toggleRecruiterMode = () => setIsRecruiterMode((prev) => !prev);

  return (
    <RecruiterModeContext.Provider
      value={{
        isRecruiterMode,
        toggleRecruiterMode,
        targetRole,
        setTargetRole: handleSetTargetRole,
      }}
    >
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterModeContext);
  if (context === undefined) {
    throw new Error("useRecruiterMode must be used within a RecruiterModeProvider");
  }
  return context;
}
