import { Administrador } from '../models/Administrador.ts';
import { Grupo } from '../models/Grupo.ts';
import { User } from '../models/User.ts';
import { UsuarioGrupo } from '../models/UsuarioGrupo.ts';

export class GrupoService {
  static async createGrupo(data: { nome: string; descricao?: string; imagem_perfil?:string }) {
    return await Grupo.create(data);
  }

  static async getGrupoById(id: number) {
    return await Grupo.findByPk(id);
  }

  static async updateGrupo(id: number, data: Partial<{ nome: string; descricao: string }>) {
    const grupo = await Grupo.findByPk(id);
    if (!grupo) throw new Error('Grupo não encontrado');
    return await grupo.update(data);
  }

  static async deleteGrupo(id: number) {
    const grupo = await Grupo.findByPk(id);
    if (!grupo) throw new Error('Grupo não encontrado');
    await grupo.destroy();
    return true;
  }
  static async getGrupoInfo(id:number){
      const grupoInfo= await Grupo.findByPk(id,{
        include:[{model:UsuarioGrupo,include:[{model:User,include:[{model:Administrador,
                                                                    where:{id_grupo:id},
                                                                    required:false
        }]}]}]
      })
      console.log("grupo Info",grupoInfo)
      return grupoInfo;
  }
 
}
export default new GrupoService()