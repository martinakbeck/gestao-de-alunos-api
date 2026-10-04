import { expect } from "chai";
import {
  cadastrarDisciplina,
  cadastrarAluno,
  deletarAluno,
  deletarDisciplina,
} from "./helpers/cadastros.js";
import disciplinas from "./fixtures/disciplinas.json" with { type: "json" };
import alunos from "./fixtures/alunos.json" with { type: "json" };
import "dotenv/config";

describe("Cadastros", () => {
  disciplinas.forEach((disciplina) => {
    it(disciplina.testTitle, async () => {
      const body = await cadastrarDisciplina(disciplina.dadosDisciplina);
      expect(body.status).to.equal(disciplina.statusEsperado);
    });
    afterEach(() => {
      if (disciplina.statusEsperado === 201) {
        deletarDisciplina(disciplina.dadosDisciplina.id);
      }
    });
  });

  alunos.forEach((aluno) => {
    it(aluno.testTitle, async () => {
      const body = await cadastrarAluno(aluno.dadosAluno);

      expect(body.status).to.equal(aluno.statusEsperado);
    });
    afterEach(() => {
      if (aluno.statusEsperado === 201) {
        deletarAluno(aluno.dadosAluno.id);
      }
    });
  });
});
