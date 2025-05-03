import { Router } from "express";
import UsuarioGrupoController from "../controllers/UsuarioGrupoController.ts";

const router=Router()
router.post('/usuarioGrupo',UsuarioGrupoController.createUsuarioGrupo)
router.get('/usuarioGrupo/:id',UsuarioGrupoController.getUsuarioGrupo)
router.delete('/usuarioGrupo/:id',UsuarioGrupoController.deleteUsuarioGrupo)
router.get('/allGrupos/:id',UsuarioGrupoController.getAllGroups)
router.delete('/grupo/remover-participante/:id/:participanteId',UsuarioGrupoController.deleteUserGrupo)
export default router