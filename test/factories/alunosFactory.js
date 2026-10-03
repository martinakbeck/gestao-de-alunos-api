export function novoAluno() {
    const timestamp = Date.now();

    return {
            nome: "Maria Joaquina",
            email: `mariajoaquina${timestamp}@email.com`,
            matricula: timestamp,
            senha: "123456"
    };
}