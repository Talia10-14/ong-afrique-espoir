import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const searchParams = request.nextUrl.searchParams
    const coachId = searchParams.get("coachId")
    const status = searchParams.get("status")

    const where: any = {}
    if (coachId) where.coachId = coachId
    if (status) where.status = status

    const events = await prisma.event.findMany({
      where,
      include: {
        coach: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        capacity: event.capacity,
        eventType: event.eventType,
        status: event.status,
        coach: event.coach.name,
        coachId: event.coachId,
      })),
    })
  } catch (error) {
    console.error("GET /api/events error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
        error: String(error),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      capacity,
      eventType,
      status,
      coachId,
    } = body

    if (!title || !startDate || !endDate || !coachId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        capacity: capacity ? parseInt(capacity) : null,
        eventType: eventType || "workshop",
        status: status || "SCHEDULED",
        coachId,
      },
      include: {
        coach: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        event: {
          ...event,
          coach: event.coach.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/events error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create event",
        error: String(error),
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Event ID is required",
        },
        { status: 400 }
      )
    }

    // Convert date strings to Date objects
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate)
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate)
    }
    if (updateData.capacity) {
      updateData.capacity = parseInt(updateData.capacity)
    }

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        coach: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      event: {
        ...event,
        coach: event.coach.name,
      },
    })
  } catch (error) {
    console.error("PUT /api/events error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update event",
        error: String(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Event ID is required",
        },
        { status: 400 }
      )
    }

    await prisma.event.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("DELETE /api/events error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete event",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
