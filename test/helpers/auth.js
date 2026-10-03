import request from 'supertest';
import 'dotenv/config';

export async function getToken(email, senha){
    const body = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: email, 
                senha: senha});


        return body.body.token;
}
let tokenEmCache = null
export async function comTokenAdmin(){
        if(!tokenEmCache){

        const body = await request(process.env.BASE_URL)
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                        email: process.env.LOGIN_EMAIL, 
                        senha: process.env.LOGIN_SENHA})

        tokenEmCache = body.body.token;
        }       
        return `Bearer ${tokenEmCache}`;
}