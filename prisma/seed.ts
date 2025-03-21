const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Delete existing records
  await prisma.services.deleteMany()

  // Create sample services
  const services = [
    {
      title: 'Regular Cleaning',
      description:
        'Thorough cleaning of your home including dusting, vacuuming, mopping, and bathroom sanitization.',
      price: '$120-180',
    },
    {
      title: 'Deep Cleaning',
      description:
        'Intensive cleaning service that covers hard-to-reach areas and includes detailed cleaning of appliances and fixtures.',
      price: '$200-300',
    },
    {
      title: 'Move In/Out Cleaning',
      description:
        'Complete cleaning service for moving in or out of a property, ensuring every corner is spotless.',
      price: '$250-350',
    },
    {
      title: 'Office Cleaning',
      description:
        'Professional cleaning service for office spaces, focusing on maintaining a clean and healthy work environment.',
      price: 'Custom Quote',
    },
  ]

  for (const service of services) {
    await prisma.services.create({
      data: service,
    })
  }

  console.log('Sample services have been created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
