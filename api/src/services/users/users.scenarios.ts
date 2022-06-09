import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String6310423' } },
    two: { data: { email: 'String2296652' } },
  },
})

export type StandardScenario = typeof standard
