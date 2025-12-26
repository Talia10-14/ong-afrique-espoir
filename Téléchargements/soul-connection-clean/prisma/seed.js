const { prisma } = require('../lib/prisma.ts')
const bcrypt = require('bcryptjs')

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a user/coach
  const coach = await prisma.user.upsert({
    where: { email: 'sophie.martin@soulconnection.fr' },
    update: {},
    create: {
      email: 'sophie.martin@soulconnection.fr',
      password: await bcrypt.hash('password123', 10),
      name: 'Sophie Martin',
      role: 'COACH',
    },
  })

  console.log('✅ Created coach:', coach)

  // Create clients
  const client1 = await prisma.client.upsert({
    where: { email: 'olivier.martin@example.com' },
    update: {},
    create: {
      email: 'olivier.martin@example.com',
      name: 'Olivier Martin',
      phone: '06 12 34 56 78',
      coachId: coach.id,
      status: 'ACTIVE',
      zodiacSign: 'Bélier',
    },
  })

  const client2 = await prisma.client.upsert({
    where: { email: 'laura.bernard@example.com' },
    update: {},
    create: {
      email: 'laura.bernard@example.com',
      name: 'Laura Bernard',
      phone: '06 23 45 67 89',
      coachId: coach.id,
      status: 'ACTIVE',
      zodiacSign: 'Lion',
    },
  })

  const client3 = await prisma.client.upsert({
    where: { email: 'jean.dupont@example.com' },
    update: {},
    create: {
      email: 'jean.dupont@example.com',
      name: 'Jean Dupont',
      phone: '06 34 56 78 90',
      coachId: coach.id,
      status: 'ACTIVE',
      zodiacSign: 'Verseau',
    },
  })

  console.log('✅ Created clients:', { client1, client2, client3 })

  // Create meetings
  const meeting1 = await prisma.meeting.create({
    data: {
      title: 'Séance de coaching initial',
      description: 'Première rencontre pour connaître les objectifs',
      startTime: new Date('2025-12-20T10:00:00'),
      endTime: new Date('2025-12-20T11:00:00'),
      location: 'Bureau Sophie Martin',
      type: 'coaching',
      status: 'SCHEDULED',
      clientId: client1.id,
      coachId: coach.id,
    },
  })

  const meeting2 = await prisma.meeting.create({
    data: {
      title: 'Suivi mensuel',
      description: 'Check-in sur la progression',
      startTime: new Date('2025-12-22T14:00:00'),
      endTime: new Date('2025-12-22T15:00:00'),
      type: 'coaching',
      status: 'SCHEDULED',
      clientId: client2.id,
      coachId: coach.id,
    },
  })

  console.log('✅ Created meetings:', { meeting1, meeting2 })

  // Create payments
  const payment1 = await prisma.payment.create({
    data: {
      amount: 150,
      currency: 'EUR',
      status: 'PAID',
      method: 'bank_transfer',
      paidAt: new Date(),
      clientId: client1.id,
      coachId: coach.id,
    },
  })

  const payment2 = await prisma.payment.create({
    data: {
      amount: 150,
      currency: 'EUR',
      status: 'PENDING',
      method: 'bank_transfer',
      dueDate: new Date('2025-12-31'),
      clientId: client2.id,
      coachId: coach.id,
    },
  })

  console.log('✅ Created payments:', { payment1, payment2 })

  // Create events
  const event1 = await prisma.event.create({
    data: {
      title: 'Atelier - Les 5 langages de l\'amour',
      description: 'Un atelier pour comprendre les différents langages amoureux',
      startDate: new Date('2025-12-28T10:00:00'),
      endDate: new Date('2025-12-28T12:00:00'),
      location: 'Salle de conférence - Centre-ville',
      capacity: 30,
      eventType: 'workshop',
      status: 'SCHEDULED',
      coachId: coach.id,
    },
  })

  console.log('✅ Created event:', event1)

  // Create tips
  const tip1 = await prisma.tip.create({
    data: {
      title: 'Technique de communication: L\'écoute active',
      content: 'Pour améliorer vos relations, écoutez véritablement votre partenaire sans juger.',
      category: 'communication',
      clientId: client1.id,
    },
  })

  console.log('✅ Created tips:', { tip1 })

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
