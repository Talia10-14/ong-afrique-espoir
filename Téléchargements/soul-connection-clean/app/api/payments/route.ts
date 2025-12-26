import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all payments or by client ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    let payments
    if (clientId) {
      payments = await prisma.payment.findMany({
        where: { clientId },
        include: {
          client: { select: { name: true } },
          coach: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    } else {
      payments = await prisma.payment.findMany({
        include: {
          client: { select: { name: true } },
          coach: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    }

    return NextResponse.json({
      success: true,
      payments,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la récupération des paiements" },
      { status: 500 }
    )
  }
}

// POST create new payment
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payment = await prisma.payment.create({
      data: {
        amount: body.amount,
        currency: body.currency || "EUR",
        status: body.status || "PENDING",
        method: body.method || "bank_transfer",
        clientId: body.clientId,
        coachId: body.coachId,
        notes: body.notes,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        paidAt: body.paidAt ? new Date(body.paidAt) : null,
      },
      include: {
        client: { select: { name: true } },
        coach: { select: { name: true } },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Paiement créé avec succès",
        payment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création du paiement" },
      { status: 500 }
    )
  }
}

// PUT update payment
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du paiement requis" },
        { status: 400 }
      )
    }

    // Convert date strings to Date objects if present
    if (data.dueDate) data.dueDate = new Date(data.dueDate)
    if (data.paidAt) data.paidAt = new Date(data.paidAt)

    const payment = await prisma.payment.update({
      where: { id },
      data,
      include: {
        client: { select: { name: true } },
        coach: { select: { name: true } },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Paiement mis à jour avec succès",
      payment,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour du paiement" },
      { status: 500 }
    )
  }
}

// DELETE payment
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID du paiement requis" },
        { status: 400 }
      )
    }

    await prisma.payment.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: "Paiement supprimé avec succès",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression du paiement" },
      { status: 500 }
    )
  }
}
