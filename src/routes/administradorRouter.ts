import { Router } from "express";
import AdministradorController from "../controllers/AdministradorController.ts";

const router= Router()
router.post('/administrador',AdministradorController.createADministrador)
router.get('/administrador/:id',AdministradorController.getAdministrador)
router.delete('/administrador/:id',AdministradorController.deleteAdm)
router.get('/administrador/check/:id/:userId',AdministradorController.getAdmGrupo)
export default router