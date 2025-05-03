import {Conversa} from '../models/Conversa.ts'
import { User } from '../models/User.ts'
import { Op } from 'sequelize'
export class ConversaService{
     async createConversa(data:{
        id_usuario_1:number,
        id_usuario_2:number,
        data_criacao?:Date,
        data_ultima_mensagem?:Date
    }){
        return await Conversa.create(data)
    }
    async getConversaByID(id:number){
        return await Conversa.findByPk(id)
    }
    async updateConversa(id:number, data:Partial<{data_ultima_mensagem:Date}>){
        const conversa= await Conversa.findByPk(id)
        if(!conversa) throw new Error('Conversa não encontrada')
        return await conversa.update(data)
    }
    async getALLconversas(id: number) {
      const conversas = await Conversa.findAll({
        where: {
          [Op.or]: [
            { id_usuario_1: id },
            { id_usuario_2: id },
          ]
        },
        include: [
          { model: User, as: 'Usuario1', attributes: ['id', 'name', 'foto_perfil'] },
          { model: User, as: 'Usuario2', attributes: ['id', 'name', 'foto_perfil'] }
        ]
      });
      let usuariosUnicos = new Map<number, { id: number; name: string; foto_perfil?: string }>();
      conversas.forEach(c => {
        const u1 = (c as any).Usuario1?.dataValues;
        const u2 = (c as any).Usuario2?.dataValues;
  
        if (u1 && u1.id !== id) {
          usuariosUnicos.set(u1.id, {
            id: u1.id,
            name: u1.name,
            foto_perfil: u1.foto_perfil
          });
        }
    
        if (u2 && u2.id !== id) {
          usuariosUnicos.set(u2.id, {
            id: u2.id,
            name: u2.name,
            foto_perfil: u2.foto_perfil
          });
        }
      });
      console.log("usuarios unicos", usuariosUnicos)
      return usuariosUnicos;
    }
    
}
export default new ConversaService()