import { api } from './helpers/api.js';
import { getToken } from './helpers/auth.js';
import { expect }           from 'chai';
import authService          from '../src/services/auth.service.js';
import * as sinon           from 'sinon';
import 'dotenv/config';

describe('Login aluno', () => {
    afterEach(() => {
    sinon.restore();
});
     it('Deve retornar 200 quando o usuário e senha forem corretos', async () => {
        const body = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'ana.souza@example.com', 
                senha: '123456'});
        expect(body.status).to.equal(200);
    })

    it('Deve retornar 400 quando a requisição for inválida', async () => {
        const body = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: '', 
                senha: "123456"});
        expect(body.status).to.equal(400);
        expect(body.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
        
    })

    it('Deve retornar 401 quando o usuário ou senha estiverem incorretos', async () => {
        const body = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'ana.souza@example.com ', 
                senha: '654321'});
        expect(body.status).to.equal(401);
    })

    it('Deve retornar 500 quando ocorrer um erro interno', async () => {
        const authServiceMock = sinon.stub(authService, 'login');
        authServiceMock.rejects(new Error('Banco de dados fora do ar'));
        const body = await api()
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send(await getToken('ana.souza@example.com', '123456'));
        expect(body.status).to.equal(500);
        
        sinon.restore();
    })
})