import { FirebaseToken } from "../models/FirebaseToken.ts";

export class FirebaseTokenService{
    async createFirebaseToken(data:{id_usuario:number,token:string}){
        return FirebaseToken.create(data)
    }
    async getFirebaseToken(id:number){
        return await FirebaseToken.findByPk(id)
    }
}
export default new FirebaseTokenService()