import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({
      isAuthenticated: false,
      user: null,
      accountType: null,
      providerProfile: null,
    });
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

    return NextResponse.json({
      isAuthenticated: true,
      user: userResponse.data,
      accountType,
      providerProfile,
    });
  } catch {
    return NextResponse.json({
      isAuthenticated: false,
      user: null,
      accountType: null,
      providerProfile: null,
    });
  }
}