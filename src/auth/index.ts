import argon2 from "argon2"

async function hashSenha(senha:string) {
    return await argon2.hash(senha);
}

async function verificarSenha(senha:string, hash:string) {
    return await argon2.verify(hash, senha);
}
export {hashSenha,verificarSenha}