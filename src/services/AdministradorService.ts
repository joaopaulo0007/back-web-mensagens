import {Administrador} from '../models/Administrador.ts'
export class AdministradorService{
    async CreateAdministrador(data:{id_grupo:number,id_usuario:number}){
        return Administrador.create(data)
    }
    async getAdministradorById(id:number){
        return await Administrador.findByPk(id)
    }
    async deleteAdministrador(id:number){
        const adm= await Administrador.findByPk(id)
        if(!adm) throw new Error('administrador não encontrado');
        await adm.destroy()
        return true
        
    }
    async getAdministradorGrupo(id_grupo:number,id_usuario:number){
        const user= await Administrador.findOne({where:{
            id_grupo:id_grupo,
            id_usuario:id_usuario
        }})
        return user
    }
}
export default new AdministradorService()