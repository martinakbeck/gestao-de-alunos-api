import {api} from './api.js';
import 'dotenv/config';
import { comTokenAdmin } from "../helpers/auth.js";
import { novoAluno } from "../factories/alunosFactory.js";
import { novaDisciplina } from "../factories/disciplinaFactory.js";

export async function cadastrarAluno() {
    const aluno = await novoAluno();
    const response = await api()
        .post('/api/admin/alunos')
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin())
        .send(aluno);
    return {
        dados: response.body,
        resposta: response,
        cadastro: aluno
    };
}

export async function cadastrarDisciplina() {
    const response = await api()
        .post('/api/admin/disciplinas')
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin())
        .send(novaDisciplina());
    return response;
}