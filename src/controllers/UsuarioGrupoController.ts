import UsuarioGrupoService  from "../services/usuarioGrupo.ts";
import express from 'express';
import type { Request, Response } from 'express';
class UsuarioGrupoController{
    async createUsuarioGrupo(req:Request,res:Response):Promise<any>{
        try {
            const{id_usuario,id_grupo,data_entrada}= req.body
            const usuario_grupo= await  UsuarioGrupoService.createUsuarioGrupo({id_usuario,id_grupo,data_entrada})
            return res.status(201).json(usuario_grupo)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getUsuarioGrupo(req:Request,res:Response):Promise<any>{
        try {
            const id= req.params
            const usuario_grupo= await UsuarioGrupoService.getUsuarioGrupoById(Number(id))
            return res.status(200).json(usuario_grupo)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async deleteUsuarioGrupo(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const usuario_grupo=await UsuarioGrupoService.deleteUsuarioGrupo(Number(id))
            return res.status(204).json(usuario_grupo)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getAllGroups(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const grupos= await UsuarioGrupoService.getAllGrupos(Number(id))
            return res.status(200).json(grupos)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async deleteUserGrupo(req:Request,res:Response):Promise<any>{
        try {
            const {id,participanteId}=req.params
            const user = await UsuarioGrupoService.deleteUser(Number(id),Number(participanteId))
            return res.status(204).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({erro:error})
        }
    }
}
export default new UsuarioGrupoController()