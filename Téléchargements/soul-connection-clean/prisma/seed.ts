import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database seed...')

  // Cleanup existing data
  await prisma.tip.deleteMany()
  await prisma.event.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.meeting.deleteMany()
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()

  // Create a user/coach
  const coach = await prisma.user.create({
    data: {
      email: 'sophie.martin@soulconnection.fr',
      password: await bcrypt.hash('password123', 10),
      name: 'Sophie Martin',
      role: 'COACH',
    },
  })

  console.log('✅ Created coach:', coach.name)

  // Helpers
  const statuses = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'INACTIVE', 'LEAD']
  const zodiacs = ['Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons']
  const meetingTypes = ['coaching', 'coaching', 'intro', 'review']
  const meetingStatuses = ['COMPLETED', 'COMPLETED', 'SCHEDULED', 'CANCELLED']

  // Generate Clients (Last 6 months)
  const clients = []
  for (let i = 0; i < 25; i++) {
    const createdAt = new Date()
    createdAt.setMonth(createdAt.getMonth() - Math.floor(Math.random() * 6))

    clients.push(await prisma.client.create({
      data: {
        email: `client${i}@example.com`,
        name: `Client ${i} Test`,
        phone: `06 ${Math.floor(10000000 + Math.random() * 90000000)}`,
        coachId: coach.id,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        zodiacSign: zodiacs[Math.floor(Math.random() * zodiacs.length)],
        createdAt,
      }
    }))
  }
  console.log(`✅ Created ${clients.length} clients`)

  // Generate Meetings & Payments (Last 6 months)
  let meetingCount = 0
  let paymentCount = 0

  for (const client of clients) {
    // 1-5 meetings per client
    const numMeetings = Math.floor(Math.random() * 5) + 1

    for (let j = 0; j < numMeetings; j++) {
      const meetingDate = new Date(client.createdAt)
      meetingDate.setDate(meetingDate.getDate() + Math.random() * 30 * j) // Spread out meetings

      await prisma.meeting.create({
        data: {
          title: 'Séance de coaching',
          startTime: meetingDate,
          endTime: new Date(meetingDate.getTime() + 60 * 60 * 1000), // 1h duration
          type: meetingTypes[Math.floor(Math.random() * meetingTypes.length)],
          status: meetingDate > new Date() ? 'SCHEDULED' : 'COMPLETED',
          clientId: client.id,
          coachId: coach.id,
        }
      })
      meetingCount++

      // 50% chance of payment per meeting
      if (Math.random() > 0.5) {
        await prisma.payment.create({
          data: {
            amount: 80 + Math.floor(Math.random() * 100), // 80-180 EUR
            currency: 'EUR',
            status: Math.random() > 0.1 ? 'PAID' : 'PENDING',
            method: 'bank_transfer',
            createdAt: meetingDate,
            clientId: client.id,
            coachId: coach.id,
          }
        })
        paymentCount++
      }
    }
  }

  console.log(`✅ Created ${meetingCount} meetings`)
  console.log(`✅ Created ${paymentCount} payments`)

  // Create some future events
  await prisma.event.create({
    data: {
      title: 'Atelier Connexion',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      capacity: 20,
      coachId: coach.id,
    }
  })

  console.log('✅ Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
