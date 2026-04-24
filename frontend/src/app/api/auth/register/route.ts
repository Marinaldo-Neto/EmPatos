import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await axios.post(`${API_BASE_URL}/api/v1/accounts/users/`, {
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const loginResponse = await axios.post(`${API_BASE_URL}/api/v1/token/`, {
      email: body.email,
      password: body.password,
    });

    const { access, refresh } = loginResponse.data;

    const nextResponse = NextResponse.json({
      success: true,
    });

    nextResponse.cookies.set("access_token", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    nextResponse.cookies.set("refresh_token", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Não foi possível criar a conta.",
      },
      { status: 400 }
    );
  }
}