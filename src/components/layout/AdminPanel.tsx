"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Save } from "lucide-react";
import { useRecruiterMode } from "@/components/context/RecruiterModeContext";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = ["AI Engineer", "Data Scientist", "Full Stack", "Software Engineer"];

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { targetRole, setTargetRole } = useRecruiterMode();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tempRole, setTempRole] = useState(targetRole);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    setTargetRole(tempRole);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Admin Dashboard</h2>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10 transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {!isAuthenticated ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Admin Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-white outline-none focus:border-violet-500/50"
                        placeholder="Enter secure password..."
                        autoFocus
                      />
                    </div>
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
                  >
                    {isLoading ? "Verifying..." : "Unlock"}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Target Role (Recruiter Mode)</label>
                    <select
                      value={tempRole}
                      onChange={(e) => setTempRole(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 p-2.5 text-white outline-none focus:border-violet-500/50"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role} className="bg-[#1e1e1e]">
                          {role}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      This will change the highlighted Top 6 Skills when Recruiter Mode is enabled.
                    </p>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" /> Save Configuration
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
