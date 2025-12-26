#!/usr/bin/env node

const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Entrez le mot de passe à hasher: ", async (password) => {
  if (!password) {
    console.error("Erreur: Le mot de passe ne peut pas être vide");
    rl.close();
    process.exit(1);
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    console.log("\n✓ Hash généré avec succès:");
    console.log(hash);
    console.log("\nAjoutez ceci à votre fichier .env.local:");
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  } catch (error) {
    console.error("Erreur lors du hachage:", error);
    process.exit(1);
  }

  rl.close();
});
