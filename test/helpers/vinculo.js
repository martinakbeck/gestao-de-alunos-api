import {api} from './api.js';
import 'dotenv/config';
import { comTokenAdmin } from "../helpers/auth.js";

export async function vincularAlunoDisciplina(disciplinaId, alunoId){
    const response = await api()
        .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
        .set('Content-Type', 'application/json')
        .set('Authorization', await comTokenAdmin())
        .send({
            alunoId
        });
    return response;
}