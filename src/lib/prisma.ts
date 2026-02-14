import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set — database features disabled')
    return null
  }
  try {
    return globalForPrisma.prisma ?? new PrismaClient()
  } catch {
    console.warn('⚠️ Failed to initialize PrismaClient')
    return null
  }
}

const client = createPrismaClient()
if (client && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = client
}

export const prisma = client
