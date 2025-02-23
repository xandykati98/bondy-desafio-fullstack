import { connection } from '../../../memoryDB/connection'
import { User } from '../../../models/User'

export const mutationTest = async (_parent, args, _context, _info) => {
  // Verifica a conexão com o banco de dados
  await connection()

  // Conta os documentos na coleção User, só testando se o banco de dados está funcionando
  const count = await User.countDocuments({})

  return {
    test: args.test,
    count,
  }
}
