import AdministradorService from "../services/AdministradorService.ts";
import express from 'express';
import type { Request, Response } from 'express';
class AdministradorController{
    async createADministrador(req:Request,res:Response):Promise<any>{
        try {
            const{id_grupo,id_usuario}=req.body
            const adm=await AdministradorService.CreateAdministrador({id_grupo,id_usuario})
           return  res.status(201).json(adm)
        } catch (error) {
          return  res.status(500).json({error})
        }
    }
    async getAdministrador(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const adm=await AdministradorService.getAdministradorById(Number(id))
           return res.status(200).json(adm)
        } catch (error) {
          return  res.status(500).json(error)
        }
    }
    async deleteAdm(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const adm=await AdministradorService.deleteAdministrador(Number(id))
           return res.status(204).json(adm)
        } catch (error) {
           return res.status(500).json(error)
        }
    }
    async getAdmGrupo(req:Request,res:Response):Promise<any>{
        try {
            const {id,userId}= req.params
            
            const adm= await AdministradorService.getAdministradorGrupo(Number(id),Number(userId))
            return res.status(200).json(adm)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}
export default new AdministradorController()