import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Validate inputs
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email et mot de passe requis" },
      { status: 400 }
    );
  }

  try {
    // Find admin by email in database
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        { success: false, message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Verify password with bcrypt
    const passwordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, message: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // Create session
    const cookieStore = await cookies();
    cookieStore.set(
      "admin_session",
      JSON.stringify({ email: admin.email, role: admin.role }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Connecté avec succès",
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

