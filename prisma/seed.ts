import { prisma } from '../src/lib/prisma'

async function main() {
  // Seed data here
  console.log('Seeding...')
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
