import { Router } from "express";
import NotificacaoController from "../controllers/NotificacaoController.ts";

const router=Router()
router.post('/notificacao',NotificacaoController.createNotificacao)
router.get('/notificacao/:id',NotificacaoController.getNotificacao )
export default router