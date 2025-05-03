import { UserService } from '../services/userService.ts';
import express from 'express';
import type { Request, Response } from 'express';
import { hashSenha } from '../auth/index.ts';


 class UserController {
  async createUser(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password, telefone } = req.body;
      const foto_perfil = req.file ? req.file.path : undefined;
  
      console.log("imagem", foto_perfil);
      if(!foto_perfil) return res.status(500)
      const hashedPassword = await hashSenha(password);
      const user = await UserService.createUser({
        name,
        email,
        password: hashedPassword,
        foto_perfil,
        telefone
      });
  
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
  
  
  async getuser(req:Request,res:Response):Promise<any>{
    try {
        const {id}= req.params
        const user=await UserService.getUserById(Number(id))
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({erro:'erro ao obter usuario'})
    }
  }
  async updateUser(req:Request,res:Response):Promise<any>{
    try {
        const id= req.params
        const {name,email,password,foto_perfil,telefone}= req.body
        const user=await UserService.updateUser(Number(id),{name,email,password,foto_perfil,telefone})
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
  }
  async deleteUser(req:Request,res:Response):Promise<any>{
    try {
        const id=req.params
        const user= await UserService.deleteUser(Number(id))
        return res.status(204).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
  }
  async Login(req:Request,res:Response):Promise<any>{
    try{
      const{email,password}= req.body
      console.log(password)
      const user=await UserService.login(email,password)
      if (user) {
        return res.status(201).json(user)
      }
       throw new Error('usuario não encontrado')
    }catch(error){
      throw error
    }
  }
  async searchUsers(req: Request, res: Response):Promise<any> {
    try {
      const { nome } = req.query;
      
      if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ message: 'Nome de busca é obrigatório' });
      }
      
      const users = await UserService.searchUsersByName(nome);
      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }
}
export default new UserController()
