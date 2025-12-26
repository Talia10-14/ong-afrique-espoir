import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all meetings or by client ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    let meetings
    if (clientId) {
      meetings = await prisma.meeting.findMany({
        where: { clientId },
        include: {
          client: {
            select: { name: true },
          },
          coach: {
            select: { name: true },
          },
        },
        orderBy: { startTime: "desc" },
      })
    } else {
      meetings = await prisma.meeting.findMany({
        include: {
          client: {
            select: { name: true },
          },
          coach: {
            select: { name: true },
          },
        },
        orderBy: { startTime: "desc" },
      })
    }

    return NextResponse.json({
      success: true,
      meetings,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des rendez-vous" },
      { status: 500 }
    )
  }
}

// POST create new meeting
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const meeting = await prisma.meeting.create({
      data: {
        title: body.title,
        description: body.description,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        location: body.location,
        type: body.type || "coaching",
        status: body.status || "SCHEDULED",
        clientId: body.clientId,
        coachId: body.coachId,
        notes: body.notes,
      },
      include: {
        client: { select: { name: true } },
        coach: { select: { name: true } },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Rendez-vous créé avec succès",
        meeting,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création du rendez-vous" },
      { status: 500 }
    )
  }
}

// PUT update meeting
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du rendez-vous requis" },
        { status: 400 }
      )
    }

    // Convert date strings to Date objects if present
    if (data.startTime) data.startTime = new Date(data.startTime)
    if (data.endTime) data.endTime = new Date(data.endTime)

    const meeting = await prisma.meeting.update({
      where: { id },
      data,
      include: {
        client: { select: { name: true } },
        coach: { select: { name: true } },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Rendez-vous mis à jour avec succès",
      meeting,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour du rendez-vous" },
      { status: 500 }
    )
  }
}

// DELETE meeting
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du rendez-vous requis" },
        { status: 400 }
      )
    }

    await prisma.meeting.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Rendez-vous supprimé avec succès",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression du rendez-vous" },
      { status: 500 }
    )
  }
}
