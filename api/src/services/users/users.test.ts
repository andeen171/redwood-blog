import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.joao.id })

    expect(result).toEqual(scenario.user.joao)
  })

  scenario('creates a user', async () => {
    const result = await createUser({
      input: {
        name: 'Jose da penha',
        email: 'jose@email.com',
        password: 'password',
        roles: 'USER',
      },
    })

    expect(result.name).toEqual('jose da penha')
    expect(result.email).toEqual('jose@email.com')
    expect(result.hashedPassword).toHaveLength(64)
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = await user({ id: scenario.user.joao.id })
    const result = await updateUser({
      id: original.id,
      input: { name: 'Joao maria' },
    })

    expect(result.name).toEqual('Joao maria')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = await deleteUser({ id: scenario.user.maria.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
