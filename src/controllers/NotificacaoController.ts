import notificacaoService from "../services/notificacaoService.ts";
import express from 'express';
import type { Request, Response } from 'express';
class NotificacaoController{
    async createNotificacao(req:Request,res:Response):Promise<any>{
        try {
            const {id_usuario,id_mensagem,tipo_mensagem,lida,data_criacao}=req.body
            const notificacao=await notificacaoService.createNotificacao({id_usuario,id_mensagem,tipo_mensagem,lida,data_criacao})
            return res.status(201).json(notificacao)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getNotificacao(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const notificacao=await notificacaoService.getNotificacao(Number(id))
            return res.status(200).json(notificacao)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export default new NotificacaoController()