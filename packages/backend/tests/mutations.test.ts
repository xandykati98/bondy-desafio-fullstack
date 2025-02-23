import { mutationTest } from '../src/graphql/resolvers/mutations/mutationTest'
import { login } from '../src/graphql/resolvers/mutations/login'
import { connection } from '../src/memoryDB/connection'
import { User } from '../src/models/User'
import bcrypt from 'bcrypt'

// Mock dependencies so we don't hit a real database or run real bcrypt comparisons
jest.mock('../src/memoryDB/connection', () => ({
  connection: jest.fn(),
}))

jest.mock('../src/models/User', () => ({
  User: {
    countDocuments: jest.fn(),
    findOne: jest.fn(),
  },
}))

jest.mock('bcrypt', () => ({
  __esModule: true,
  default: {
    compare: jest.fn(),
  },
}))

describe('Mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('mutationTest', () => {
    it('should return the provided test value and count from the User collection', async () => {
      ;(User.countDocuments as jest.Mock).mockResolvedValue(42)
      
      const args = { test: 'sampleTest' }
      const result = await mutationTest(null, args, {}, {})

      expect(result).toEqual({ test: 'sampleTest', count: 42 })
      expect(connection).toHaveBeenCalled()
      expect(User.countDocuments).toHaveBeenCalledWith({})
    })
  })

  describe('login', () => {
    const fakeUser = {
      toObject: () => ({
        _id: '1',
        name: 'Test User',
        email: 'test@test.com',
        company: 'Test Co',
        password: 'hashed',
      }),
      password: 'hashed',
    }

    it('should return user data when login is successful', async () => {
      ;(User.findOne as jest.Mock).mockResolvedValue(fakeUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const args = { email: 'test@test.com', password: 'password' }
      const result = await login(null, args, {}, {})

      const expectedUser = {
        _id: '1',
        name: 'Test User',
        email: 'test@test.com',
        company: 'Test Co',
      }
      expect(result).toEqual(expectedUser)
      expect(connection).toHaveBeenCalled()
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' })
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed')
    })

    it('should throw an error if user is not found', async () => {
      ;(User.findOne as jest.Mock).mockResolvedValue(null)

      const args = { email: 'nonexistent@test.com', password: 'password' }
      await expect(login(null, args, {}, {})).rejects.toThrow('Usuário não encontrado')

      expect(connection).toHaveBeenCalled()
      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@test.com' })
    })

    it('should throw an error if password is incorrect', async () => {
      ;(User.findOne as jest.Mock).mockResolvedValue(fakeUser)
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const args = { email: 'test@test.com', password: 'wrongPassword' }
      await expect(login(null, args, {}, {})).rejects.toThrow('Senha inválida')

      expect(connection).toHaveBeenCalled()
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@test.com' })
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashed')
    })
  })
})
