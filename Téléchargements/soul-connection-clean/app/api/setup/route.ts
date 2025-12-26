import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "sophie.martin@soulconnection.fr" },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: true,
          message: "Utilisateur déjà créé",
          user: existingUser,
        },
        { status: 200 }
      )
    }

    // Create test user
    const hashedPassword = await bcrypt.hash("password123", 10)
    const user = await prisma.user.create({
      data: {
        email: "sophie.martin@soulconnection.fr",
        password: hashedPassword,
        name: "Sophie Martin",
        role: "COACH",
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Utilisateur créé avec succès",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la création de l'utilisateur",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
