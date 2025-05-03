import multer from 'multer';
import mensagemService from '../services/mensagemService.ts';
import fs from 'fs';

import type { Request, Response } from 'express';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/conversas';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const uploadMensagem = upload.single('arquivo');

 class MensagemController {
   async criarMensagem(req: Request, res: Response):Promise<any> {
    try {
      const { id_conversa, id_grupo, id_remetente, conteudo } = req.body;

      const arquivo = req.file ? req.file.path : null;
      
      const novaMensagem = await mensagemService.createMensagem({
        id_conversa: id_conversa ? Number(id_conversa) : undefined,
        id_grupo: id_grupo ? Number(id_grupo) : undefined,
        id_remetente: Number(id_remetente),
        conteudo,
        arquivo:arquivo? arquivo:undefined
      });

      return res.status(201).json(novaMensagem);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Erro ao criar mensagem', detail: err });
    }
  }
  async getMensagem(req: Request, res: Response):Promise<any> {
    try {
      const id = Number(req.params.id);
      const msg = await mensagemService.getMensagemByID(id);
      if (!msg) {
        return res.status(404).json({ error: 'Mensagem não encontrada' });
      }
  
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const msgJson = msg.toJSON();
  
      if (msg.arquivo) {
        msgJson.arquivo = `${baseUrl}/${msg.arquivo.replace(/\\/g, '/')}`;
      }
  
      return res.status(200).json(msgJson);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar mensagem', detail: error });
    }
  }
  async updateMensagem(req:Request,res:Response):Promise<any>{
    try {
        const id = req.params
        const{conteudo,data_envio}= req.body
        const msg=await mensagemService.updateMensagem(Number(id),{conteudo,data_envio})
        return res.status(200).json(msg)
    } catch (error) {
        return res.status(500).json({error:'erro ao atualizar mensagem', detail:error})
    }
  }
  async deleteMensagem(req:Request,res:Response):Promise<any>{
    try {
        const id= req.params
        const user=await  mensagemService.deleteMensagem(Number(id))
        return res.status(204).json(user)
    } catch (error) {
        return res.status(500).json({error:"erro ao deletar mensagem", detail:error})
    }
  }
  async getAllMensagens(req:Request,res:Response):Promise<any>{
    try {
      const id=req.query.id
      const group=req.query.group==="true"
      const mensagens=await mensagemService.getMensagensRecentesDoUsuario(Number(id),group)
      return res.status(200).json(mensagens)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
  async mensagensRecentes(req:Request,res:Response):Promise<any>{
    try {
      const id=req.params
      console.log("id",id)
      const mensagens=await mensagemService.getAllConversations(Number(id.id))
      return res.status(200).json(mensagens)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }
}
export default new MensagemController()
