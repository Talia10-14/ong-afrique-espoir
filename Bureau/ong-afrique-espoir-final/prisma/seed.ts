import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create default admin
  const adminEmail = "admin@afrique-espoir.org"
  
  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  })

  if (!existingAdmin) {
    // Hash the default password
    const hashedPassword = await bcrypt.hash("admin123", 10)
    
    await prisma.admin.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        name: "Administrateur",
        role: "super_admin",
        isActive: true
      }
    })
    
    console.log("✓ Admin par défaut créé : admin@afrique-espoir.org / admin123")
  } else {
    console.log("✓ Admin par défaut existe déjà")
  }

  const actions = [
    {
      title: "Distribution de kits scolaires",
      description: "Distribution de 500 kits scolaires aux enfants du village de Tanongou pour la rentrée 2025.",
      icon: "BookOpen",
      color: "blue",
      image: "/about.jpg",
      date: "Septembre 2025",
      location: "Tanongou",
      category: "Éducation"
    },
    {
      title: "Campagne de reboisement",
      description: "Plantation de 1000 arbres pour lutter contre la désertification dans le nord du Bénin.",
      icon: "Tree",
      color: "green",
      image: "/about.jpg",
      date: "Août 2025",
      location: "Natitingou",
      category: "Environnement"
    },
    {
      title: "Formation en informatique",
      description: "Lancement de la première cohorte de formation en développement web pour les jeunes filles.",
      icon: "Laptop",
      color: "yellow",
      image: "/about.jpg",
      date: "Juillet 2025",
      location: "Cotonou",
      category: "Technologie"
    }
  ]

  for (const action of actions) {
    await prisma.action.create({
      data: action
    })
  }

  console.log("✓ Seed complété avec succès")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
