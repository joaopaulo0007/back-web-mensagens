import { Grupo } from "../models/Grupo.ts";
import { UsuarioGrupo } from "../models/UsuarioGrupo.ts";

export class UsuarioGrupoService {
    async createUsuarioGrupo(data: { id_usuario: number, id_grupo: number, data_entrada?: Date }) {
        return UsuarioGrupo.create(data)
    }
    async getUsuarioGrupoById(id: number) {
        return UsuarioGrupo.findByPk(id)
    }
    async deleteUsuarioGrupo(id: number) {
        const usuario_grupo = await UsuarioGrupo.findByPk(id)
        if (!usuario_grupo) throw new Error('usuario do grupo não encontrado')
        await usuario_grupo.destroy()
        return true
    }
    async getAllGrupos(id: number) {
        const grupos = await UsuarioGrupo.findAll({
            where: {
                id_usuario: id
            }, include: {
                model: Grupo, attributes: ['id', 'nome', 'descricao']
            }
        })
        return grupos
    }
    async deleteUser(id_grupo: number, id_participante: number) {
        const user = await UsuarioGrupo.findOne({
            where: {
                id_grupo: id_grupo, id_usuario: id_participante
            }
        })
        if (!user) throw new Error('usuario do grupo não encontrado')
        await user.destroy()
        return true
    }
}
export default new UsuarioGrupoService()