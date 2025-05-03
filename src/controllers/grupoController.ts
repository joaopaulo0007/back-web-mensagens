import express from 'express';
import type { Request, Response } from 'express';
import { GrupoService } from '../services/GrupoService.ts';
import UsuarioGrupoService from '../services/usuarioGrupo.ts';
import AdministradorService from '../services/AdministradorService.ts';


class GrupoController {
  createGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { nome, descricao, adm, users } = req.body;
      const imagem_perfil = req.file?.path;

      if (!nome || !adm || !users) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes (nome, adm, users).' });
      }

      const parsedUsers = typeof users === 'string' ? JSON.parse(users) : users;

      const grupo = await GrupoService.createGrupo({ nome, descricao, imagem_perfil });
      const grupoJson = grupo.toJSON(); // ou grupo.get()
      await AdministradorService.CreateAdministrador({
        id_grupo: grupoJson.id,
        id_usuario: Number(adm),
      });


      await UsuarioGrupoService.createUsuarioGrupo({
        id_grupo: grupoJson.id,
        id_usuario: Number(adm),
      });

      for (const user of parsedUsers) {
        await UsuarioGrupoService.createUsuarioGrupo({
          id_grupo: grupoJson.id,
          id_usuario: Number(user.id),
        });
      }

      return res.status(201).json({ message: 'Grupo criado com sucesso!', grupo });
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      return res.status(500).json({ error: 'Erro ao criar grupo', detail: error });
    }
  };


  getGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const grupo = await GrupoService.getGrupoById(Number(id));
      if (!grupo) res.status(404).json({ error: 'Grupo não encontrado' });
      return res.status(200).json(grupo);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar grupo', detail: error });
    }
  };

  updateGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;
      const grupo = await GrupoService.updateGrupo(Number(id), { nome, descricao });
      return res.status(200).json(grupo);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar grupo', detail: error });
    }
  };

  deleteGrupo = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
      await GrupoService.deleteGrupo(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar grupo', detail: error });
    }
  };
  async getGrupoInfo(req:Request,res:Response):Promise<any>{
    try {
      const {id}= req.params
      const grupoInfo=await GrupoService.getGrupoInfo(Number(id))
      return res.status(200).json(grupoInfo)
    } catch (error) {
      console.log(error)
      return res.status(500)
    }
  }
}

export default new GrupoController()