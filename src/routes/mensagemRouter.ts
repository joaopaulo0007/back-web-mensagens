import { Router } from "express";
import mensagemController from "../controllers/mensagemController.ts";

const router=Router()
router.post('/mensagem',mensagemController.criarMensagem)
router.get('/mensagem/:id',mensagemController.getMensagem)
router.put('/mensagem/:id',mensagemController.updateMensagem)
router.delete('/mensagem/:id',mensagemController.deleteMensagem)
router.get('/allmensagens',mensagemController.getAllMensagens)
router.get('/resumo-mensagens/:id',mensagemController.mensagensRecentes)
export default router