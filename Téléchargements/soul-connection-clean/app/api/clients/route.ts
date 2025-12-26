import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"

// GET all clients
export async function GET(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const clients = await prisma.client.findMany({
      include: {
        coach: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      clients: clients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        coach: client.coach?.name,
        status: client.status,
        zodiacSign: client.zodiacSign,
      })),
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des clients" },
      { status: 500 }
    )
  }
}

// POST create new client
export async function POST(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const body = await request.json()

    // For now, we'll use a default coach ID. In a real app, you'd get this from the authenticated user
    const defaultCoachId = await prisma.user.findFirst().then((user) => user?.id)

    if (!defaultCoachId) {
      return NextResponse.json(
        { success: false, message: "Pas de coach trouvé" },
        { status: 400 }
      )
    }

    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        coachId: defaultCoachId,
        status: body.status || "ACTIVE",
        zodiacSign: body.zodiacSign,
        notes: body.notes,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Client créé avec succès",
        client: {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          status: client.status,
          zodiacSign: client.zodiacSign,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création du client" },
      { status: 500 }
    )
  }
}

// PUT update client
export async function PUT(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du client requis" },
        { status: 400 }
      )
    }

    const client = await prisma.client.update({
      where: { id },
      data,
    })

    return NextResponse.json({
      success: true,
      message: "Client mis à jour avec succès",
      client,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour du client" },
      { status: 500 }
    )
  }
}

// DELETE client
export async function DELETE(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du client requis" },
        { status: 400 }
      )
    }

    await prisma.client.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Client supprimé avec succès",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression du client" },
      { status: 500 }
    )
  }
}

