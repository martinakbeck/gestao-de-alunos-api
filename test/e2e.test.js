import { expect } from "chai";
import { cadastrarAluno } from "./helpers/cadastros.js";
import { vincularAlunoDisciplina } from "./helpers/vinculo.js";
import { entregarTrabalho } from "./helpers/entrega.js";
import { cadastrarDisciplina } from "./helpers/cadastros.js";
import { getToken } from "./helpers/auth.js";


describe("Teste E2E", () => {

  it("Deve permitir a entrega de um trabalho", async () => {
    
    const responseAluno = await cadastrarAluno();
    const responseDisciplina = await cadastrarDisciplina();


    const vinculoAlunoDisciplina = await vincularAlunoDisciplina(
            responseDisciplina.body.id,
            responseAluno.dados.id,
    );

    const tokenAluno = await getToken(
      responseAluno.cadastro.email,
      responseAluno.cadastro.senha
    )


    const entregaTrabalho = await entregarTrabalho(tokenAluno, responseAluno.dados.id, {
      disciplinaId: responseDisciplina.body.id,
      titulo: "Lista de Exercícios",
      descricao: "Resolução dos exercícios de 21 a 40 do capítulo 2.",
    });

    expect(entregaTrabalho.status).to.equal(201);
    expect(entregaTrabalho.body).to.have.property("id");
    expect(entregaTrabalho.body).to.have.property("alunoId", responseAluno.dados.id);
    expect(entregaTrabalho.body).to.have.property("disciplinaId", responseDisciplina.body.id);
    expect(entregaTrabalho.body).to.have.property("titulo", "Lista de Exercícios");
    expect(entregaTrabalho.body).to.have.property("descricao", "Resolução dos exercícios de 21 a 40 do capítulo 2.");
    expect(entregaTrabalho.body).to.have.property("status", "entregue");
  });
});