import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs | Prisma.PostCreateArgs | Prisma.UserCreateArgs>({
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
  },
  comment: {
    joao: {
      data: {
        body: 'I like trees',
        author: {
          connect: {
            email: 'joao@email.com',
          },
        },
        post: {
          create: {
            title: 'Redwood Leaves',
            body: 'The quick brown fox jumped over the lazy dog.',
            author: {
              connect: {
                email: 'joao@email.com',
              },
            },
          },
        },
      },
    },
  },
})

export const postOnly = defineScenario<Prisma.PostCreateArgs | Prisma.UserCreateArgs>({
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
    bark: {
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
        author: {
          create: {
            name: 'Joe Doe',
            email: 'joe@email.com',
            hashedPassword: 'password',
            salt: 'salt',
            roles: 'ADMIN',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
export type PostOnlyScenario = typeof postOnly
