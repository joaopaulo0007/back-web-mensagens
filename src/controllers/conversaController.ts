import express from 'express';
import type { Request, Response } from 'express';
import ConversaService from '../services/ConversaService.ts';

export class ConversaController {
   async createConversa(req: Request, res: Response):Promise<any> {
    try {
      const { id_usuario_1, id_usuario_2 } = req.body;
      const conversa = await ConversaService.createConversa({ id_usuario_1, id_usuario_2 });
      return res.status(201).json(conversa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar conversa', detail: error });
    }
  }

   async getConversa(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const conversa = await ConversaService.getConversaByID(Number(id));
      if (!conversa)  res.status(404).json({ error: 'Conversa não encontrada' });
      return res.status(200).json(conversa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar conversa', detail: error });
    }
  }

   async updateConversa(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const { data_ultima_mensagem } = req.body;
      const conversa = await ConversaService.updateConversa(Number(id), { data_ultima_mensagem });
     return  res.status(200).json(conversa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar conversa', detail: error });
    }
  }
  async getConversas(req:Request,res:Response):Promise<any>{
    try {
      const {id}= req.params
      const users= await ConversaService.getALLconversas(Number(id))
      console.log("usuarios",users)
      return res.status(200).json(Array.from(users.values()));
    } catch (error) {
      throw error
    }
  }
}
export default new ConversaController()