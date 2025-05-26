const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing services
  await prisma.services.deleteMany()

  // Insert new services
  const services = [
    {
      title: 'Window Cleaning',
      description:
        'Professional window cleaning services for residential and commercial properties. We use eco-friendly products and ensure streak-free results.',
    },
    {
      title: 'Gutter Cleaning',
      description:
        'Keep your gutters clean and functional with our thorough gutter cleaning service. We remove debris and ensure proper water flow.',
    },
    {
      title: 'Pressure Washing',
      description:
        'Restore the beauty of your property with our pressure washing service. We clean driveways, sidewalks, and exterior surfaces.',
    },
    {
      title: 'Waste Removal',
      description:
        'Efficient and responsible waste removal services. We handle all types of waste and ensure proper disposal.',
    },
    {
      title: 'Commercial Services',
      description:
        'Comprehensive cleaning solutions for businesses. We offer customized packages to meet your specific needs.',
    },
    {
      title: 'Specialized Cleaning',
      description:
        'Specialized cleaning services for unique requirements. Contact us for custom solutions tailored to your needs.',
    },
  ]

  for (const service of services) {
    await prisma.services.create({
      data: service,
    })
  }

  console.log('Services seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
