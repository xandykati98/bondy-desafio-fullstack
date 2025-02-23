import { connection } from '../../../memoryDB/connection'
import { User } from '../../../models/User'
import bcrypt from 'bcrypt'

export const login = async (_parent, { email, password }, _context, _info) => {
    try {

        await connection()
    
        const user = await User.findOne({ email })
      
        if (!user) {
          throw new Error('Usuário não encontrado')
        }
      
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
          throw new Error('Senha inválida')
        }
      
        const userObj = user.toObject()
        delete userObj.password
      
        return userObj
    } catch (error) {
        console.error(error)
        throw error
    }
}
  