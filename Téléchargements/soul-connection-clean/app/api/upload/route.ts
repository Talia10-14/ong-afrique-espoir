import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json(
                { error: "Aucun fichier fourni" },
                { status: 400 }
            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), "public/uploads")
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (error) {
            console.error("Error creating upload directory:", error)
        }

        // Create unique filename
        const fileExtension = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${fileExtension}`
        const filePath = join(uploadDir, fileName)

        console.log("Saving file to:", filePath)

        // Write file
        await writeFile(filePath, buffer)

        // Return the public URL
        const publicUrl = `/uploads/${fileName}`

        return NextResponse.json({
            success: true,
            url: publicUrl
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json(
            { error: "Erreur lors de l'upload du fichier" },
            { status: 500 }
        )
    }
}
