import { Op } from 'sequelize';
import { User } from '../models/User.ts';
import {verificarSenha} from '../auth/index.ts'
export class UserService {
  static async createUser(data: { name: string; email: string; password: string; foto_perfil?: string; telefone?: string }) {
    return await User.create(data);
  }

  static async getUserById(id: number) {
    return await User.findByPk(id);
  }
  

  static async updateUser(id: number, data: Partial<{ name: string; email: string; password: string; foto_perfil: string; telefone: string }>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    return await user.update(data);
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    await user.destroy();
    return true;
  }
  static async login(email:string,senha:string){
    try {
      const user = await User.findOne({ where: { email: email },raw:true });
      if(!user)  throw new Error('usuario não encontrado');
      console.log(user)
      if(!await verificarSenha(senha,user.password)){
            throw new Error('senha inválida')
      }
      return user;
    } catch (error) {
      throw error
    }
  }

  static async searchUsersByName(name: string) {
    return await User.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }, 
      },
      limit: 20,
    });
  }
}
