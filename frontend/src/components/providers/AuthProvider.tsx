"use client";

import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { SessionData } from "@/types/session";
import { guestSession } from "@/lib/auth/constants";

type LoginData = {
  email: string;
  password: string;
};

type AuthContextValue = {
  session: SessionData;
  user: SessionData["user"];
  isAuthenticated: boolean;
  accountType: SessionData["accountType"];
  providerProfile: SessionData["providerProfile"];
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
  initialSession?: SessionData;
};

export function AuthProvider({
  children,
  initialSession = guestSession,
}: AuthProviderProps) {
  const [session, setSession] = useState<SessionData>(initialSession);

  async function refreshSession() {
    const response = await axios.get<SessionData>("/api/auth/session");
    setSession(response.data);
  }

  async function login(data: LoginData) {
    await axios.post("/api/auth/login", data);
    await refreshSession();
  }

  async function logout() {
    await axios.post("/api/auth/logout");
    setSession(guestSession);
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session.user,
        isAuthenticated: session.isAuthenticated,
        accountType: session.accountType,
        providerProfile: session.providerProfile,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}