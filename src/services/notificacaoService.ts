import { Notificacao } from "../models/Notificação.ts";

export class NotificacaoService{
    async createNotificacao(data:{id_usuario:number,id_mensagem?:number,tipo_mensagem:string,lida?:boolean,data_criacao:Date}){
        return Notificacao.create(data)
    }
    async getNotificacao(id:number){
        return Notificacao.findByPk(id)
    }
}

export default new NotificacaoService()