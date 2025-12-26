#!/usr/bin/env node

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("\n📋 Liste des administrateurs\n");

  const admins = await prisma.admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (admins.length === 0) {
    console.log("Aucun administrateur trouvé.\n");
    await prisma.$disconnect();
    return;
  }

  console.log("┌─────┬──────────────────────────┬──────────────────────────┬─────────────┬────────┬─────────────────────┐");
  console.log("│ ID  │ Email                    │ Nom                      │ Rôle        │ Actif  │ Créé le             │");
  console.log("├─────┼──────────────────────────┼──────────────────────────┼─────────────┼────────┼─────────────────────┤");

  admins.forEach((admin) => {
    const createdDate = admin.createdAt.toLocaleDateString("fr-FR");
    const email = admin.email.padEnd(24);
    const name = admin.name.padEnd(24);
    const role = admin.role.padEnd(11);
    const active = admin.isActive ? "✓" : "✗";

    console.log(
      `│ ${admin.id.toString().padEnd(3)} │ ${email} │ ${name} │ ${role} │ ${active.padEnd(6)} │ ${createdDate}        │`
    );
  });

  console.log("└─────┴──────────────────────────┴──────────────────────────┴─────────────┴────────┴─────────────────────┘\n");

  await prisma.$disconnect();
}

main();
