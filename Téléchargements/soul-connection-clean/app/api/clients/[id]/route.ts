
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET single client
export async function GET(request: Request, { params }: RouteParams) {
    const auth = await requireAuth()
    if (auth.error) return auth.response

    const { id } = await params

    try {
        const client = await prisma.client.findUnique({
            where: { id },
            include: {
                coach: {
                    select: { name: true },
                },
            },
        })

        if (!client) {
            return NextResponse.json(
                { success: false, message: "Client non trouvé" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            client,
        })
    } catch (error) {
        console.error("API error:", error)
        return NextResponse.json(
            { success: false, message: "Erreur lors de la récupération du client" },
            { status: 500 }
        )
    }
}

// PATCH update client
export async function PATCH(request: Request, { params }: RouteParams) {
    const auth = await requireAuth()
    if (auth.error) return auth.response

    const { id } = await params

    try {
        const body = await request.json()

        // Check if client exists
        const existingClient = await prisma.client.findUnique({
            where: { id },
        })

        if (!existingClient) {
            return NextResponse.json(
                { success: false, message: "Client non trouvé" },
                { status: 404 }
            )
        }

        const client = await prisma.client.update({
            where: { id },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                status: body.status,
                notes: body.notes,
                // Add other fields as needed
            },
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
export async function DELETE(request: Request, { params }: RouteParams) {
    const auth = await requireAuth()
    if (auth.error) return auth.response

    const { id } = await params

    try {
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
