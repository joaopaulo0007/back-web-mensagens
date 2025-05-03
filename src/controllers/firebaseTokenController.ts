import firebaseTokenservice from "../services/firebaseToken.ts";
import express from 'express';
import type { Request, Response } from 'express';
class FirebaseTokenController{
    async createFirebaseToken(req:Request,res:Response):Promise<any>{
        try {
            const{id_usuario,token}=req.body
            const FirebaseToken=await firebaseTokenservice.createFirebaseToken({id_usuario,token})
           return res.status(201).json(FirebaseToken)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getFirebaseToken(req:Request,res:Response):Promise<any>{
        try {
            const id=req.params
            const FirebaseToken=firebaseTokenservice.getFirebaseToken(Number(id))
            return res.status(200).json(FirebaseToken)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
export default new FirebaseTokenController()