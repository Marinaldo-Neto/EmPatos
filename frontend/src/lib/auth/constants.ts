import { SessionData } from "@/types/session";

export const guestSession: SessionData = {
  isAuthenticated: false,
  user: null,
  accountType: null,
  providerProfile: null,
};