import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  const auth = await requireAuth()
  if (auth.error) return auth.response

  try {
    const searchParams = request.nextUrl.searchParams
    const clientId = searchParams.get("clientId")
    const category = searchParams.get("category")

    const where: any = {}
    if (clientId) where.clientId = clientId
    if (category) where.category = category

    const tips = await prisma.tip.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      tips: tips.map((tip) => ({
        id: tip.id,
        title: tip.title,
        content: tip.content,
        category: tip.category,
        clientId: tip.clientId,
        client: tip.client.name,
        createdAt: tip.createdAt,
        updatedAt: tip.updatedAt,
      })),
    })
  } catch (error) {
    console.error("GET /api/tips error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tips",
        error: String(error),
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, category, clientId } = body

    if (!title || !content || !clientId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      )
    }

    const tip = await prisma.tip.create({
      data: {
        title,
        content,
        category: category || "general",
        clientId,
      },
      include: {
        client: {
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
        tip: {
          ...tip,
          client: tip.client.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/tips error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create tip",
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
          message: "Tip ID is required",
        },
        { status: 400 }
      )
    }

    const tip = await prisma.tip.update({
      where: { id },
      data: updateData,
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      tip: {
        ...tip,
        client: tip.client.name,
      },
    })
  } catch (error) {
    console.error("PUT /api/tips error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update tip",
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
          message: "Tip ID is required",
        },
        { status: 400 }
      )
    }

    await prisma.tip.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Tip deleted successfully",
    })
  } catch (error) {
    console.error("DELETE /api/tips error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete tip",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
