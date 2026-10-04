import { expect } from "chai";
import { entregarTrabalho } from "./helpers/entrega.js";
import { comTokenAluno } from "./helpers/auth.js";
import trabalhos from "./fixtures/trabalhos.json" with { type: "json" };

describe("Entregas de Trabalhos", () => {
  trabalhos.forEach((trabalho) => {
    it(trabalho.testTitle, async () => {
      const tokenAluno = await comTokenAluno(
        trabalho.dadosAluno.email,
        trabalho.dadosAluno.senha,
      );

      const entregaTrabalho = await entregarTrabalho(
        tokenAluno,
        trabalho.dadosAluno.alunoId,
        trabalho.dadosTrabalho,
      );

      expect(entregaTrabalho.status).to.equal(trabalho.statusEsperado);
    });
  });
});
