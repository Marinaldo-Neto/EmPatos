import "server-only";

import { cookies } from "next/headers";
import axios from "axios";
import { SessionData } from "@/types/session";
import { guestSession } from "@/lib/auth/constants";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getServerSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return guestSession;
  }

  try {
    const userResponse = await axios.get(
      `${API_BASE_URL}/api/v1/accounts/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let providerProfile = null;
    let accountType: "client" | "provider" = "client";

    try {
      const providerResponse = await axios.get(
        `${API_BASE_URL}/api/v1/providers/profiles/me/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      providerProfile = providerResponse.data;
      accountType = "provider";
    } catch {
      accountType = "client";
    }

    return {
      isAuthenticated: true,
      user: userResponse.data,
      accountType,
      providerProfile,
    };
  } catch {
    return guestSession;
  }
}