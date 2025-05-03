import { Router } from 'express';
import  ConversaController  from '../controllers/conversaController.ts';
import conversaController from '../controllers/conversaController.ts';

const router = Router();

router.post('/conversa', ConversaController.createConversa);
router.get('/conversa/:id', ConversaController.getConversa);
router.put('/conversa/:id', ConversaController.updateConversa);
router.get('/conversas/:id',conversaController.getConversas)
export default router;