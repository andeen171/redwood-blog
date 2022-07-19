import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    joao: {
      data: {
        name: 'Joao da cunha az',
        email: 'joao@email.com',
        hashedPassword: 'hashedPassword',
        salt: 'salt',
        roles: 'USER',
      },
    },
    maria: {
      data: {
        name: 'Maria aparecida',
        email: 'maria@email.com',
        hashedPassword: 'hashedPassword',
        salt: 'salt',
        roles: 'USER',
      },
    },
  },
})

export type StandardScenario = typeof standard
