import {Mensagem} from '../models/Mensagem.ts'
import { Op } from 'sequelize';
import { UsuarioGrupo } from '../models/UsuarioGrupo.ts';
import { Conversa } from '../models/Conversa.ts';
import { User } from '../models/User.ts';
import { Grupo } from '../models/Grupo.ts';
import grupoController from '../controllers/grupoController.ts';
export class MensagemService{
    async createMensagem(data: {
        id_conversa?: number;
        id_remetente: number;
        id_grupo?: number;
        conteudo?: string;
        arquivo?: string;
        data_envio?: Date;
      }) {
        if (!data.conteudo && !data.arquivo) {
          throw new Error('Mensagem deve conter texto ou arquivo');
        }
        return await Mensagem.create(data);
      }
      
    async getMensagemByID(id:number){
        return await Mensagem.findByPk(id)
    }
    async updateMensagem(id:number,data:Partial<{conteudo:string,data_envio:Date}>){
        const Msg= await Mensagem.findByPk(id)
        if(!Msg) throw new Error('mensagem não encontrada')
        await Msg.update(data)
    }
    async deleteMensagem(id:number){
        const msg= await Mensagem.findByPk(id)
        if(!msg) throw new Error('mensagem não encontrada')
        await msg.destroy()
        return true
    }
    async getMensagensRecentesDoUsuario(id: number,group:boolean=false, data_inicio?: Date) {
      console.log(group)
      if(group){
        const mensagensGrupo= await Mensagem.findAll({
          where:{id_grupo:id}
        })
        console.log("mensagens",mensagensGrupo)
        return mensagensGrupo
      }
      const mensagens= await Mensagem.findAll({where:{
        id_conversa:id
      }})
      console.log("id da mensagem ....",id)
      console.log("mensagens privadas", mensagens)
      return mensagens
     
    }
    async getPrivateConversations(userId: number) {
      // Buscar conversas onde o usuário é um dos participantes
      const conversas = await Conversa.findAll({
        where: {
          [Op.or]: [
            { id_usuario_1: userId },
            { id_usuario_2: userId },
          ]
        },
        include: [
          { model: User, as: 'Usuario1', attributes: ['id', 'name', 'foto_perfil'] },
          { model: User, as: 'Usuario2', attributes: ['id', 'name', 'foto_perfil'] }
        ],
        order: [['data_ultima_mensagem', 'DESC']]
      });
  
      // Mapear as conversas para ter o formato desejado
      return conversas.map(conversa => {
        const conversaTyped = conversa as any; // Type casting para acessar as associações
        console.log("conversa", conversaTyped.Usuario1.dataValues)
        // Determinar qual é o outro usuário na conversa
        const otherUser = conversaTyped.Usuario1.dataValues.id === userId
          ? conversaTyped.Usuario2.dataValues
          : conversaTyped.Usuario1.dataValues;
  
        return {
          id: conversa.dataValues.id,
          name: otherUser.name,
          avatar: otherUser.foto_perfil,
          lastMessageTime: conversa.dataValues.data_ultima_mensagem || conversa.dataValues.data_criacao,
          isGroup: false
        };
      });
    }
  
    /**
     * Obtém todos os grupos de um usuário
     * @param userId ID do usuário
     * @returns Array de grupos dos quais o usuário participa
     */
    async getGroupConversations(userId: number) {
      // Buscar grupos dos quais o usuário participa
      const userGrupos = await UsuarioGrupo.findAll({
        where: { id_usuario: userId },
        include: [{ 
          model: Grupo, 
          attributes: ['id', 'nome', 'descricao', 'data_criacao','imagem_perfil'] 
        }],
        order: [[Grupo, 'data_criacao', 'DESC']]
      });
      console.log("userGroups",userGrupos)
      // Mapear os grupos para ter o formato desejado
      return userGrupos.map(item => {
        const gruponormal = (item as any).Grupo;
        const grupo=gruponormal.toJSON()
        console.log("print do grupo JSON",grupo)
        return {
          id: grupo.id,
          name: grupo.nome,
          description: grupo.descricao,
          avatar: grupo.imagem_perfil, // Você pode adicionar uma imagem padrão ou campo para foto do grupo
          lastMessageTime: grupo.data_criacao,
          isGroup: true
        };
      });
    }
  
    /**
     * Obtém todas as conversas e grupos de um usuário
     * @param userId ID do usuário
     * @returns Objeto com arrays de conversas privadas e grupos
     */
    async getAllConversations(userId: number) {
      const [privateConversations, groupConversations] = await Promise.all([
        this.getPrivateConversations(userId),
        this.getGroupConversations(userId)
      ]);
      console.log("privateConversation", privateConversations)
      console.log("grupo",groupConversations)
      return {
        users: privateConversations,
        groups: groupConversations
      };
    }
}
export default new MensagemService()