export type AccountType = "client" | "provider";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

export type ProviderCategory = {
  id: number;
  name: string;
};

export type ProviderProfile = {
  id: number;
  bio: string;
  description: string;
  is_available: boolean;
  categories: ProviderCategory[];
};

export type SessionData = {
  isAuthenticated: boolean;
  user: SessionUser | null;
  accountType: AccountType | null;
  providerProfile: ProviderProfile | null;
};