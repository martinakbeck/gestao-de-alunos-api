import { api } from './api.js';
import 'dotenv/config';

export async function comTokenAluno(emailAluno, senhaAluno){
    const body = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: emailAluno, 
                senha: senhaAluno});

        return `Bearer ${body.body.token}`;
}
let tokenEmCache = null
export async function comTokenAdmin(){
        if(!tokenEmCache){

        const body = await api()
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                        email: process.env.LOGIN_EMAIL, 
                        senha: process.env.LOGIN_SENHA})

        tokenEmCache = body.body.token;
        }       
        return `Bearer ${tokenEmCache}`;
}