import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST() {
  try {
    // First, try to find the coach, if not found, create one
    let coach = await prisma.user.findFirst({
      where: { email: "sophie.martin@soulconnection.fr" },
    })

    if (!coach) {
      coach = await prisma.user.create({
        data: {
          email: "sophie.martin@soulconnection.fr",
          password: await bcrypt.hash("password123", 10),
          name: "Sophie Martin",
          role: "COACH",
        },
      })
    }

    console.log("✅ Created/Found coach:", coach)

    // Create clients
    const client1 = await prisma.client.create({
      data: {
        email: "olivier.martin@example.com",
        name: "Olivier Martin",
        phone: "06 12 34 56 78",
        coachId: coach.id,
        status: "ACTIVE",
        zodiacSign: "Bélier",
      },
    })

    const client2 = await prisma.client.create({
      data: {
        email: "laura.bernard@example.com",
        name: "Laura Bernard",
        phone: "06 23 45 67 89",
        coachId: coach.id,
        status: "ACTIVE",
        zodiacSign: "Lion",
      },
    })

    const client3 = await prisma.client.create({
      data: {
        email: "jean.dupont@example.com",
        name: "Jean Dupont",
        phone: "06 34 56 78 90",
        coachId: coach.id,
        status: "ACTIVE",
        zodiacSign: "Verseau",
      },
    })

    console.log("✅ Created clients")

    // Create meetings
    await prisma.meeting.create({
      data: {
        title: "Séance de coaching initial",
        description: "Première rencontre pour connaître les objectifs",
        startTime: new Date("2025-12-20T10:00:00"),
        endTime: new Date("2025-12-20T11:00:00"),
        location: "Bureau Sophie Martin",
        type: "coaching",
        status: "SCHEDULED",
        clientId: client1.id,
        coachId: coach.id,
      },
    })

    await prisma.meeting.create({
      data: {
        title: "Suivi mensuel",
        description: "Check-in sur la progression",
        startTime: new Date("2025-12-22T14:00:00"),
        endTime: new Date("2025-12-22T15:00:00"),
        type: "coaching",
        status: "SCHEDULED",
        clientId: client2.id,
        coachId: coach.id,
      },
    })

    console.log("✅ Created meetings")

    // Create payments
    await prisma.payment.create({
      data: {
        amount: 150,
        currency: "EUR",
        status: "PAID",
        method: "bank_transfer",
        paidAt: new Date(),
        clientId: client1.id,
        coachId: coach.id,
      },
    })

    await prisma.payment.create({
      data: {
        amount: 150,
        currency: "EUR",
        status: "PENDING",
        method: "bank_transfer",
        dueDate: new Date("2025-12-31"),
        clientId: client2.id,
        coachId: coach.id,
      },
    })

    console.log("✅ Created payments")

    // Create events
    await prisma.event.create({
      data: {
        title: "Atelier - Les 5 langages de l'amour",
        description: "Un atelier pour comprendre les différents langages amoureux",
        startDate: new Date("2025-12-28T10:00:00"),
        endDate: new Date("2025-12-28T12:00:00"),
        location: "Salle de conférence - Centre-ville",
        capacity: 30,
        eventType: "workshop",
        status: "SCHEDULED",
        coachId: coach.id,
      },
    })

    console.log("✅ Created event")

    // Create coaching tips
    await prisma.tip.create({
      data: {
        title: "L'importance de l'écoute active",
        content:
          "L'écoute active est fondamentale dans les relations. Écoutez sans jugement et posez des questions clarificatrices pour mieux comprendre votre partenaire.",
        category: "communication",
        clientId: client1.id,
      },
    })

    await prisma.tip.create({
      data: {
        title: "Gérer les conflits avec bienveillance",
        content:
          "Exprimez vos sentiments sans blâmer. Utilisez des formules en 'je' plutôt que 'tu' pour communiquer votre ressenti.",
        category: "relations",
        clientId: client2.id,
      },
    })

    await prisma.tip.create({
      data: {
        title: "Méditation quotidienne pour le bien-être",
        content:
          "Pratiquez 10 minutes de méditation chaque matin pour réduire le stress et améliorer votre clarté mentale.",
        category: "mindfulness",
        clientId: client3.id,
      },
    })

    await prisma.tip.create({
      data: {
        title: "Développer son amour-propre",
        content:
          "Pratiquez l'auto-compassion. Traitez-vous avec la même gentillesse que vous accorderiez à un ami proche.",
        category: "development",
        clientId: client1.id,
      },
    })

    await prisma.tip.create({
      data: {
        title: "Créer des limites saines",
        content:
          "Les limites sont essentielles pour le bien-être. Apprenez à dire non sans culpabilité et établissez des limites claires dans vos relations.",
        category: "relations",
        clientId: client2.id,
      },
    })

    console.log("✅ Created tips")

    return NextResponse.json(
      {
        success: true,
        message: "Database seeded successfully!",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error seeding database",
        error: String(error),
      },
      { status: 500 }
    )
  }
}
