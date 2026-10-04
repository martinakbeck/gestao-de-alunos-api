import { api } from "./helpers/api.js";
import { expect } from "chai";
import { comTokenAdmin } from "./helpers/auth.js";
import authService from "../src/services/auth.service.js";
import * as sinon from "sinon";
import "dotenv/config";

describe("Login admin", () => {
  afterEach(() => {
    sinon.restore();
  });
  it("Deve retornar 200 quando o usuário e senha forem corretos", async () => {
    const body = await api()
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({
        email: process.env.LOGIN_EMAIL,
        senha: process.env.LOGIN_SENHA,
      });

    expect(body.status).to.equal(200);
  });

  it("Deve retornar 400 quando a requisição for inválida", async () => {
    const body = await api()
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({
        email: "",
        senha: process.env.ADMIN_SENHA,
      });
    expect(body.status).to.equal(400);
    expect(body.body.error).to.equal(
      'Os campos "email" e "senha" são obrigatórios.',
    );
  });

  it("Deve retornar 401 quando o usuário ou senha estiverem incorretos", async () => {
    const body = await api()
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({
        email: "admin@email.com",
        senha: "admin123",
      });
    expect(body.status).to.equal(401);
  });

  it("Deve retornar 500 quando ocorrer um erro interno", async () => {
    const authServiceMock = sinon.stub(authService, "login");
    authServiceMock.rejects(new Error("Banco de dados fora do ar"));
    const body = await api()
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send(await comTokenAdmin());
    expect(body.status).to.equal(500);

    sinon.restore();
  });
});
