import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        updatedAt: '2022-06-09T14:58:39Z',
        title: 'String',
        body: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2022-06-09T14:58:39Z',
        title: 'String',
        body: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
