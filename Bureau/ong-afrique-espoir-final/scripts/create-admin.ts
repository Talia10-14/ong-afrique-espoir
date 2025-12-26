#!/usr/bin/env node

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createInterface } from "readline";

const prisma = new PrismaClient();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

async function main() {
  console.log("\n📋 Créer un nouvel administrateur\n");

  const email = await question("Email de l'admin: ");
  const name = await question("Nom complet: ");
  const password = await question("Mot de passe (minimum 8 caractères): ");
  
  console.log("\nRôles disponibles:");
  console.log("1. super_admin (Accès complet)");
  console.log("2. moderator (Modérateur)\n");
  
  const roleChoice = await question("Choisir un rôle (1 ou 2): ");
  const role = roleChoice === "2" ? "moderator" : "super_admin";

  if (password.length < 8) {
    console.error("❌ Erreur: Le mot de passe doit contenir au moins 8 caractères");
    rl.close();
    process.exit(1);
  }

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.error("❌ Erreur: Un admin avec cet email existe déjà");
    rl.close();
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        passwordHash: hashedPassword,
        name,
        role,
        isActive: true,
      },
    });

    console.log("\n✓ Admin créé avec succès!");
    console.log(`  Email: ${admin.email}`);
    console.log(`  Nom: ${admin.name}`);
    console.log(`  Rôle: ${admin.role}`);
    console.log(`  Actif: ${admin.isActive}\n`);
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'admin:", error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main();
