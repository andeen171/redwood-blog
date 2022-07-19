import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs | Prisma.UserCreateArgs>({
  user: {
    joao: {
      data: {
        name: 'Joao da silva',
        email: 'joao@email.com',
        hashedPassword: 'String',
        salt: 'String',
        roles: 'ADMIN',
      },
    },
  },
  post: {
    one: {
      data: {
        title: 'One',
        body: 'One for all',
        author: {
          connect: {
            email: 'joao@email.com',
          },
        },
      },
    },
    two: {
      data: {
        title: 'Two',
        body: 'Two for one',
        author: {
          connect: {
            email: 'joao@email.com',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
