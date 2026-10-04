import {api} from './api.js';
import 'dotenv/config';
import { comTokenAdmin } from "../helpers/auth.js";

export async function cadastrarAluno(aluno) {
    const response = await api()
        .post('/api/admin/alunos')
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin())
        .send(aluno);
    return response;
}

export async function cadastrarDisciplina(disciplina) {
    const response = await api()
        .post('/api/admin/disciplinas')
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin())
        .send(disciplina);
    return response;
}

export async function deletarAluno(id){
    const response = await api()
        .delete(`/api/admin/alunos/${id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin());
    return response;
}