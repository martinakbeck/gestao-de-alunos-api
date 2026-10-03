import {api} from './api.js';
import 'dotenv/config';

export async function entregarTrabalho(token, alunoId, trabalho){
    const response = await api()
        .post(`/api/alunos/${alunoId}/trabalhos`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(trabalho);

    return response;
}