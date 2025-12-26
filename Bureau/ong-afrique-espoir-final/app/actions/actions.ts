"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { writeFile } from "fs/promises";
import { join } from "path";

const ActionSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string(),
  color: z.string(),
  image: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
});

export async function getActions(query?: string) {
  if (!query) {
    return await prisma.action.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  return await prisma.action.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } },
        { category: { contains: query } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function handleImageUpload(file: File | null): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const path = join(process.cwd(), "public/uploads", filename);
  
  await writeFile(path, buffer);
  return `/uploads/${filename}`;
}

export async function createAction(prevState: unknown, formData: FormData) {
  const imageFile = formData.get("imageFile") as File | null;
  let imagePath = formData.get("image") as string | undefined;

  if (imageFile && imageFile.size > 0) {
    const uploadedPath = await handleImageUpload(imageFile);
    if (uploadedPath) imagePath = uploadedPath;
  }

  const validatedFields = ActionSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    color: formData.get("color"),
    image: imagePath,
    date: formData.get("date") || undefined,
    location: formData.get("location") || undefined,
    category: formData.get("category") || undefined,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Champs invalides",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.action.create({
      data: validatedFields.data,
    });
    revalidatePath("/");
    revalidatePath("/actions");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Action créée avec succès" };
  } catch (error) {
    console.error("Failed to create action:", error);
    return { success: false, message: "Erreur lors de la création" };
  }
}

export async function updateAction(id: number, prevState: unknown, formData: FormData) {
  const imageFile = formData.get("imageFile") as File | null;
  let imagePath = formData.get("image") as string | undefined;

  if (imageFile && imageFile.size > 0) {
    const uploadedPath = await handleImageUpload(imageFile);
    if (uploadedPath) imagePath = uploadedPath;
  }

  const validatedFields = ActionSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    color: formData.get("color"),
    image: imagePath,
    date: formData.get("date") || undefined,
    location: formData.get("location") || undefined,
    category: formData.get("category") || undefined,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Champs invalides",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.action.update({
      where: { id },
      data: validatedFields.data,
    });
    revalidatePath("/");
    revalidatePath("/actions");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Action modifiée avec succès" };
  } catch (error) {
    console.error("Failed to update action:", error);
    return { success: false, message: "Erreur lors de la modification" };
  }
}

export async function deleteAction(id: number) {
  try {
    await prisma.action.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/actions");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Action supprimée" };
  } catch (error) {
    console.error("Failed to delete action:", error);
    return { success: false, message: "Erreur lors de la suppression" };
  }
}
