import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { email: "sophie.martin@soulconnection.fr" },
    })

    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "Utilisateur déjà existant",
          user: { id: user.id, email: user.email, name: user.name },
        },
        { status: 200 }
      )
    }

    // Créer l'utilisateur avec mot de passe hashé
    const hashedPassword = await bcrypt.hash("password123", 10)
    user = await prisma.user.create({
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
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error initializing user:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de l'initialisation",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
